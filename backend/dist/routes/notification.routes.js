"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const NotificationService_1 = require("../services/NotificationService");
const JsonRepository_1 = require("../repositories/JsonRepository");
const router = (0, express_1.Router)();
const notificationService = new NotificationService_1.NotificationService();
const accountRepo = new JsonRepository_1.JsonRepository('accounts.json');
router.get('/my', async (req, res) => {
    try {
        const userId = req.header('x-user-id');
        if (!userId)
            return res.status(401).json({ error: 'Missing user id' });
        const notifications = await notificationService.getCustomerNotifications(userId);
        res.json(notifications);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
router.get('/admin', async (_req, res) => {
    try {
        const notifications = await notificationService.getAdminNotifications();
        res.json(notifications);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
router.put('/:id/read', async (req, res) => {
    try {
        const userId = req.header('x-user-id');
        if (!userId)
            return res.status(401).json({ error: 'Missing user id' });
        const account = await accountRepo.findById(userId);
        const notification = await notificationService.markRead(req.params.id, userId, account?.role || 'CUSTOMER');
        res.json(notification);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.default = router;
