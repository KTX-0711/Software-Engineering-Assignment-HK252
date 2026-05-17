"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = __importDefault(require("path"));
const DATA_DIR = path_1.default.join(__dirname, '../../src/data');
async function seed() {
    await promises_1.default.mkdir(DATA_DIR, { recursive: true });
    const accounts = [
        { id: 'acc_001', username: 'phamhoangnam.admin', password: '123', role: 'ADMIN', displayName: 'Phạm Hoàng Nam' },
        { id: 'acc_002', username: 'leminhkhang.staff', password: '123', role: 'EMPLOYEE', displayName: 'Lê Minh Khang' },
        { id: 'acc_008', username: 'vothanhdat.staff', password: '123', role: 'EMPLOYEE', displayName: 'Võ Thành Đạt' },
        { id: 'acc_009', username: 'dangthuyanh.staff', password: '123', role: 'EMPLOYEE', displayName: 'Đặng Thùy Anh' },
        { id: 'acc_003', username: 'nguyenvanhung@hcmut.edu.vn', password: '123', role: 'CUSTOMER', displayName: 'Nguyễn Văn Hùng', studentId: '2311301', accountCategory: 'STUDENT', parkingPlan: 'PAYG' },
        { id: 'acc_004', username: 'nguyentoquocviet@hcmut.edu.vn', password: '123', role: 'CUSTOMER', displayName: 'Nguyễn Tô Quốc Việt', studentId: '2313898', accountCategory: 'STUDENT', parkingPlan: 'PAYG' },
        { id: 'acc_005', username: 'tranminhtri@hcmut.edu.vn', password: '123', role: 'CUSTOMER', displayName: 'Trần Minh Trí', studentId: '2313626', accountCategory: 'STUDENT', parkingPlan: 'PAYG' },
        { id: 'acc_006', username: 'nguyenluukhanhtrinh@hcmut.edu.vn', password: '123', role: 'CUSTOMER', displayName: 'Nguyễn Lưu Khánh Trình', studentId: '2313638', accountCategory: 'STUDENT', parkingPlan: 'PAYG' },
        { id: 'acc_007', username: 'lecongvinh@hcmut.edu.vn', password: '123', role: 'CUSTOMER', displayName: 'Lê Công Vinh', studentId: '2313912', accountCategory: 'STUDENT', parkingPlan: 'PAYG' }
    ];
    const vehicles = [];
    const rfidCards = [
        { id: 'RFID_SV001', type: 'MEMBER', accountId: 'acc_003', status: 'ACTIVE' },
        { id: 'RFID_SV002', type: 'MEMBER', accountId: 'acc_004', status: 'ACTIVE' },
        { id: 'RFID_SV003', type: 'MEMBER', accountId: 'acc_005', status: 'ACTIVE' },
        { id: 'RFID_SV004', type: 'MEMBER', accountId: 'acc_006', status: 'ACTIVE' },
        { id: 'RFID_SV005', type: 'MEMBER', accountId: 'acc_007', status: 'ACTIVE' },
        { id: 'RFID_GUEST_001', type: 'GUEST', status: 'ACTIVE' },
        { id: 'RFID_GUEST_002', type: 'GUEST', status: 'ACTIVE' }
    ];
    const parkingSpots = [];
    const iotDevices = [];
    for (const area of ['A', 'B']) {
        for (let i = 1; i <= 40; i++) {
            const id = `${area}${i.toString().padStart(2, '0')}`;
            const occupiedA = [1, 2, 4, 7, 9, 12, 14, 17, 19, 22, 24, 27, 29, 31, 34, 36, 38, 40];
            const occupiedB = [1, 3, 4, 6, 8, 9, 11, 13, 15, 16, 18, 20, 21, 23, 25, 27, 28, 30, 32, 34, 35, 37, 39, 40];
            const occupied = (area === 'A' && occupiedA.includes(i)) || (area === 'B' && occupiedB.includes(i));
            const maintenance = area === 'A' && i === 2;
            parkingSpots.push({ id, status: maintenance ? 'Maintenance' : occupied ? 'Occupied' : 'Available', floor: area });
            iotDevices.push({
                id: `SENS_${id}`,
                spotId: id,
                status: maintenance ? 'DATAERROR' : 'ACTIVE',
                batteryLevel: 85
            });
        }
    }
    const pricingPolicy = [{
            id: 'default',
            guestPerVisitFee: 4000,
            studentPerVisitFee: 3000,
            monthlyDiscountRate: 0.8
        }];
    const files = {
        'accounts.json': accounts,
        'vehicles.json': vehicles,
        'rfidCards.json': rfidCards,
        'parkingSpots.json': parkingSpots,
        'iotDevices.json': iotDevices,
        'pricingPolicy.json': pricingPolicy,
        'parkingSessions.json': [],
        'transactions.json': [],
        'invoices.json': [],
        'logs.json': []
    };
    for (const [fileName, data] of Object.entries(files)) {
        const filePath = path_1.default.join(DATA_DIR, fileName);
        // pricingPolicy is a single object, others are arrays
        const content = fileName === 'pricingPolicy.json' ? JSON.stringify(data, null, 2) : JSON.stringify(data, null, 2);
        await promises_1.default.writeFile(filePath, content);
        console.log(`Seeded ${fileName}`);
    }
}
seed().catch(err => {
    console.error('Seed failed:', err);
    process.exit(1);
});
