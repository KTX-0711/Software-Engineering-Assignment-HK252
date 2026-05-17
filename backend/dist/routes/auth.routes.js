"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const zod_1 = require("zod");
const AuthService_1 = require("../services/AuthService");
const router = (0, express_1.Router)();
const authService = new AuthService_1.AuthService();
const loginSchema = zod_1.z.object({
    username: zod_1.z.string(),
    password: zod_1.z.string().min(1)
});
const resetPasswordSchema = zod_1.z.object({
    username: zod_1.z.string().min(1),
    password: zod_1.z.string().min(1)
});
router.post('/login', async (req, res) => {
    try {
        const { username, password } = loginSchema.parse(req.body);
        const user = await authService.login(username, password);
        // For MVP, client stores x-user-id instead of real token
        res.json({ userId: user.id, role: user.role, displayName: user.displayName });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
router.post('/reset-password', async (req, res) => {
    try {
        const { username, password } = resetPasswordSchema.parse(req.body);
        const user = await authService.resetCustomerPassword(username.trim(), password);
        res.json({ userId: user.id, role: user.role, displayName: user.displayName });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
router.get('/me', async (req, res) => {
    try {
        const userId = req.header('x-user-id');
        if (!userId)
            throw new Error('Missing x-user-id header');
        const user = await authService.getAccountById(userId);
        if (!user)
            return res.status(404).json({ error: 'User not found' });
        res.json(user);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.default = router;
