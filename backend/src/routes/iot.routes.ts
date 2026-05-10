import { Router } from 'express';
import { IoTService } from '../services/IoTService';

const router = Router();
const service = new IoTService();

router.get('/devices', async (req, res) => {
  const devices = await service.getDevices();
  res.json(devices);
});

export default router;
