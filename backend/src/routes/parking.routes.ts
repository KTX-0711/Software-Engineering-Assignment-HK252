import { Router } from 'express';
import { ParkingSessionService } from '../services/ParkingSessionService';

const router = Router();
const service = new ParkingSessionService();

router.get('/sessions', async (req, res) => {
  const activeSessions = await service.getActiveSessions();
  res.json(activeSessions);
});

router.get('/spots', async (req, res) => {
  const spots = await service.getSpots();
  res.json(spots);
});

export default router;
