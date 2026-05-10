import { Router } from 'express';
import { VehicleService } from '../services/VehicleService';

const router = Router();
const vehicleService = new VehicleService();

router.get('/my', async (req, res) => {
  try {
    const userId = req.header('x-user-id');
    if (!userId) return res.status(401).json({ error: 'Missing user id' });

    const vehicles = await vehicleService.getCustomerVehicles(userId);
    res.json(vehicles);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const userId = req.header('x-user-id');
    if (!userId) return res.status(401).json({ error: 'Missing user id' });

    const vehicle = await vehicleService.createRegistration(userId, req.body);
    res.status(201).json(vehicle);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const userId = req.header('x-user-id');
    if (!userId) return res.status(401).json({ error: 'Missing user id' });

    const result = await vehicleService.deleteVehicle(userId, req.params.id);
    res.json(result);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
