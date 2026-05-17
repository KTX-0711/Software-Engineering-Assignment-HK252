import { Router } from 'express';
import { SubscriptionService } from '../services/SubscriptionService';

const router = Router();
const subscriptionService = new SubscriptionService();

router.get('/my', async (req, res) => {
  try {
    const userId = req.header('x-user-id');
    if (!userId) return res.status(401).json({ error: 'Missing user id' });

    const subscription = await subscriptionService.getSubscription(userId);
    res.json(subscription);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

router.put('/my', async (req, res) => {
  try {
    const userId = req.header('x-user-id');
    if (!userId) return res.status(401).json({ error: 'Missing user id' });

    const subscription = await subscriptionService.updateSubscription(userId, req.body.planType);
    res.json(subscription);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
