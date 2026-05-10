"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IoTService = void 0;
const JsonRepository_1 = require("../repositories/JsonRepository");
const LogService_1 = require("./LogService");
const NotificationService_1 = require("./NotificationService");
class IoTService {
    constructor() {
        this.spotRepo = new JsonRepository_1.JsonRepository('parkingSpots.json');
        this.deviceRepo = new JsonRepository_1.JsonRepository('iotDevices.json');
        this.logger = new LogService_1.LogService();
        this.notificationService = new NotificationService_1.NotificationService();
    }
    async trigger(sensorId, detectObject) {
        const device = await this.deviceRepo.findById(sensorId);
        if (!device)
            throw new Error('Device not found');
        const newStatus = detectObject ? 'Occupied' : 'Available';
        await this.spotRepo.update(device.spotId, { status: newStatus });
        await this.deviceRepo.update(sensorId, { status: 'ACTIVE' });
        await this.logger.log(sensorId, 'IOT_TRIGGER', { spotId: device.spotId, detectObject });
    }
    async setFault(sensorId, status) {
        const device = await this.deviceRepo.findById(sensorId);
        if (!device)
            throw new Error('Device not found');
        await this.deviceRepo.update(sensorId, { status });
        await this.spotRepo.update(device.spotId, { status: status === 'ACTIVE' ? 'Available' : 'Maintenance' });
        await this.logger.log(sensorId, 'IOT_FAULT_SET', { status });
        if (status !== 'ACTIVE') {
            await this.notificationService.createNotification({
                audience: 'ADMIN',
                type: 'IOT_FAULT',
                title: 'Thiết bị IoT cần kiểm tra',
                message: `Thiết bị ${sensorId} tại vị trí ${device.spotId} đang ở trạng thái ${status}.`,
                level: status === 'OFFLINE' || status === 'DATAERROR' ? 'ERROR' : 'WARNING',
                link: '/admin/iot',
                dedupeKey: `iot-fault-${sensorId}-${status}`
            });
        }
    }
    async getDevices() {
        return this.deviceRepo.findAll();
    }
}
exports.IoTService = IoTService;
