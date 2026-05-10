"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const SubscriptionService_1 = require("../services/SubscriptionService");
const router = (0, express_1.Router)();
const subscriptionService = new SubscriptionService_1.SubscriptionService();
router.get('/my', async (req, res) => {
    try {
        const userId = req.header('x-user-id');
        if (!userId)
            return res.status(401).json({ error: 'Missing user id' });
        const subscription = await subscriptionService.getSubscription(userId);
        res.json(subscription);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
router.put('/my', async (req, res) => {
    try {
        const userId = req.header('x-user-id');
        if (!userId)
            return res.status(401).json({ error: 'Missing user id' });
        const subscription = await subscriptionService.updateSubscription(userId, req.body.planType);
        res.json(subscription);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.default = router;
