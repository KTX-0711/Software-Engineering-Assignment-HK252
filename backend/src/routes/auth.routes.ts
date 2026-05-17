import { Router } from 'express';
import { z } from 'zod';
import { AuthService } from '../services/AuthService';

const router = Router();
const authService = new AuthService();

const loginSchema = z.object({
  username: z.string(),
  password: z.string().min(1)
});

const resetPasswordSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1)
});

router.post('/login', async (req, res) => {
  try {
    const { username, password } = loginSchema.parse(req.body);
    const user = await authService.login(username, password);
    // For MVP, client stores x-user-id instead of real token
    res.json({ userId: user.id, role: user.role, displayName: user.displayName });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

router.post('/reset-password', async (req, res) => {
  try {
    const { username, password } = resetPasswordSchema.parse(req.body);
    const user = await authService.resetCustomerPassword(username.trim(), password);
    res.json({ userId: user.id, role: user.role, displayName: user.displayName });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/me', async (req, res) => {
  try {
    const userId = req.header('x-user-id');
    if (!userId) throw new Error('Missing x-user-id header');
    const user = await authService.getAccountById(userId);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
