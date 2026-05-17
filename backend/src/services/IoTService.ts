import { JsonRepository } from '../repositories/JsonRepository';
import { ParkingSpot, IoTDevice } from '../types/domain';
import { LogService } from './LogService';
import { NotificationService } from './NotificationService';

export class IoTService {
  private spotRepo = new JsonRepository<ParkingSpot>('parkingSpots.json');
  private deviceRepo = new JsonRepository<IoTDevice>('iotDevices.json');
  private logger = new LogService();
  private notificationService = new NotificationService();

  async trigger(sensorId: string, detectObject: boolean) {
    const device = await this.deviceRepo.findById(sensorId);
    if (!device) throw new Error('Device not found');

    const newStatus = detectObject ? 'Occupied' : 'Available';
    await this.spotRepo.update(device.spotId, { status: newStatus });
    await this.deviceRepo.update(sensorId, { status: 'ACTIVE' });
    await this.logger.log(sensorId, 'IOT_TRIGGER', { spotId: device.spotId, detectObject });
  }

  async setFault(sensorId: string, status: IoTDevice['status']) {
    const device = await this.deviceRepo.findById(sensorId);
    if (!device) throw new Error('Device not found');
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
