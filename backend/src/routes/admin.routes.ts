import { Router } from 'express';
import { AdminService } from '../services/AdminService';
import { LogService } from '../services/LogService';
import { VehicleService } from '../services/VehicleService';
import { VehicleStatus } from '../types/domain';

const router = Router();
const adminService = new AdminService();
const logService = new LogService();
const vehicleService = new VehicleService();

router.get('/summary', async (req, res) => {
  const summary = await adminService.getSummary();
  res.json(summary);
});

router.get('/logs', async (req, res) => {
  const logs = await logService.getLogs();
  res.json(logs);
});

router.get('/pricing-policy', async (req, res) => {
  const policy = await adminService.getPricingPolicy();
  res.json(policy);
});

router.get('/internal-accounts', async (req, res) => {
  try {
    const accounts = await adminService.getInternalAccounts();
    res.json(accounts);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

router.post('/internal-accounts', async (req, res) => {
  try {
    const userId = req.header('x-user-id') || 'admin';
    const account = await adminService.createInternalAccount(req.body, userId);
    res.json(account);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

router.put('/internal-accounts/:id', async (req, res) => {
  try {
    const userId = req.header('x-user-id') || 'admin';
    const account = await adminService.updateInternalAccount(req.params.id, req.body, userId);
    res.json(account);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

router.delete('/internal-accounts/:id', async (req, res) => {
  try {
    const userId = req.header('x-user-id') || 'admin';
    const result = await adminService.deleteInternalAccount(req.params.id, userId);
    res.json(result);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/vehicle-registrations', async (req, res) => {
  try {
    const status = req.query.status as VehicleStatus | undefined;
    const registrations = await vehicleService.getRegistrations(status);
    res.json(registrations);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

router.put('/vehicle-registrations/:id/review', async (req, res) => {
  try {
    const userId = req.header('x-user-id') || 'admin';
    const registration = await vehicleService.reviewRegistration(req.params.id, userId, req.body.decision, req.body.reason);
    res.json(registration);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

router.put('/pricing-policy', async (req, res) => {
  try {
    const userId = req.header('x-user-id') || 'admin';
    const policy = await adminService.updatePricingPolicy(req.body, userId);
    res.json(policy);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
