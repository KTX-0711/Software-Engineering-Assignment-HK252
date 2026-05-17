"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VehicleService = void 0;
const JsonRepository_1 = require("../repositories/JsonRepository");
const LogService_1 = require("./LogService");
const NotificationService_1 = require("./NotificationService");
const ownerNamePattern = /^[A-Za-zÀ-ỹ\s]{2,}$/;
const phonePattern = /^(0|\+84)(\d{9})$/;
class VehicleService {
    constructor() {
        this.repo = new JsonRepository_1.JsonRepository('vehicles.json');
        this.logger = new LogService_1.LogService();
        this.notificationService = new NotificationService_1.NotificationService();
    }
    async getCustomerVehicles(customerId) {
        const vehicles = await this.repo.findAll();
        return vehicles.filter(vehicle => vehicle.customerId === customerId);
    }
    async createRegistration(customerId, input) {
        const ownerName = input.ownerName.trim().replace(/\s+/g, ' ');
        const phone = input.phone.trim();
        const licensePlate = input.licensePlate.trim().toUpperCase();
        const color = input.color.trim();
        const licensePlateImageName = input.licensePlateImageName.trim();
        const licensePlateImageData = input.licensePlateImageData?.trim();
        const vehicleRegistrationImageName = input.vehicleRegistrationImageName.trim();
        const vehicleRegistrationImageData = input.vehicleRegistrationImageData?.trim();
        if (!ownerNamePattern.test(ownerName))
            throw new Error('Ho ten chu xe khong hop le');
        if (!phonePattern.test(phone))
            throw new Error('So dien thoai khong hop le');
        if (licensePlate.length < 6)
            throw new Error('Bien so khong hop le');
        if (!color)
            throw new Error('Mau xe la bat buoc');
        if (!licensePlateImageName)
            throw new Error('Anh bien so xe la bat buoc');
        if (!vehicleRegistrationImageName)
            throw new Error('Anh ca vet xe la bat buoc');
        const vehicles = await this.repo.findAll();
        const customerVehicles = vehicles.filter(vehicle => vehicle.customerId === customerId);
        if (customerVehicles.length >= 3)
            throw new Error('Moi tai khoan chi duoc dang ky toi da 3 xe');
        if (customerVehicles.some(vehicle => vehicle.licensePlate.toUpperCase() === licensePlate)) {
            throw new Error('Bien so nay da ton tai trong ho so cua ban');
        }
        const now = new Date().toISOString();
        const vehicle = {
            id: `veh_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
            customerId,
            ownerName,
            phone,
            licensePlate,
            color,
            licensePlateImageName,
            licensePlateImageData,
            vehicleRegistrationImageName,
            vehicleRegistrationImageData,
            status: 'PENDING',
            createdAt: now,
            updatedAt: now
        };
        await this.repo.save(vehicle);
        await this.logger.log(customerId, 'VEHICLE_REGISTRATION_CREATED', { vehicleId: vehicle.id, licensePlate });
        return vehicle;
    }
    async deleteVehicle(customerId, vehicleId) {
        const vehicles = await this.repo.findAll();
        const vehicle = vehicles.find(item => item.id === vehicleId);
        if (!vehicle)
            throw new Error('Khong tim thay xe');
        if (vehicle.customerId !== customerId)
            throw new Error('Khong co quyen xoa xe nay');
        await this.repo.saveAll(vehicles.filter(item => item.id !== vehicleId));
        await this.logger.log(customerId, 'VEHICLE_DELETED', { vehicleId, licensePlate: vehicle.licensePlate });
        return { ok: true };
    }
    async getRegistrations(status) {
        const vehicles = await this.repo.findAll();
        return status ? vehicles.filter(vehicle => vehicle.status === status) : vehicles;
    }
    async reviewRegistration(vehicleId, adminId, decision, reason) {
        const vehicle = await this.repo.findById(vehicleId);
        if (!vehicle)
            throw new Error('Khong tim thay ho so xe');
        const now = new Date().toISOString();
        const status = decision === 'APPROVE' ? 'APPROVED' : 'REJECTED';
        const rejectionReason = reason?.trim();
        if (status === 'REJECTED' && !rejectionReason)
            throw new Error('Ly do tu choi la bat buoc');
        const updated = await this.repo.update(vehicleId, {
            status,
            rejectionReason: status === 'REJECTED' ? rejectionReason : undefined,
            reviewedBy: adminId,
            reviewedAt: now,
            updatedAt: now
        });
        await this.logger.log(adminId, `VEHICLE_REGISTRATION_${status}`, {
            vehicleId,
            customerId: vehicle.customerId,
            licensePlate: vehicle.licensePlate,
            rejectionReason: updated.rejectionReason
        });
        await this.notificationService.createNotification({
            audience: 'CUSTOMER',
            userId: vehicle.customerId,
            type: status === 'APPROVED' ? 'VEHICLE_APPROVED' : 'VEHICLE_REJECTED',
            title: status === 'APPROVED' ? 'Hồ sơ xe đã được duyệt' : 'Hồ sơ xe bị từ chối',
            message: status === 'APPROVED'
                ? `Xe biển số ${vehicle.licensePlate} đã được duyệt và có thể sử dụng trong bãi xe.`
                : `Xe biển số ${vehicle.licensePlate} bị từ chối. Lý do: ${updated.rejectionReason}.`,
            level: status === 'APPROVED' ? 'SUCCESS' : 'ERROR',
            link: '/customer/vehicles/register',
            dedupeKey: `vehicle-review-${vehicleId}-${status}-${now}`
        });
        return updated;
    }
}
exports.VehicleService = VehicleService;
