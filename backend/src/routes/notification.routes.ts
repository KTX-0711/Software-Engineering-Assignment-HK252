import { Router } from 'express';
import { NotificationService } from '../services/NotificationService';
import { JsonRepository } from '../repositories/JsonRepository';
import { Account } from '../types/domain';

const router = Router();
const notificationService = new NotificationService();
const accountRepo = new JsonRepository<Account>('accounts.json');

router.get('/my', async (req, res) => {
  try {
    const userId = req.header('x-user-id');
    if (!userId) return res.status(401).json({ error: 'Missing user id' });

    const notifications = await notificationService.getCustomerNotifications(userId);
    res.json(notifications);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/admin', async (_req, res) => {
  try {
    const notifications = await notificationService.getAdminNotifications();
    res.json(notifications);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

router.put('/:id/read', async (req, res) => {
  try {
    const userId = req.header('x-user-id');
    if (!userId) return res.status(401).json({ error: 'Missing user id' });

    const account = await accountRepo.findById(userId);
    const notification = await notificationService.markRead(req.params.id, userId, account?.role || 'CUSTOMER');
    res.json(notification);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
