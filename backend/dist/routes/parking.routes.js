"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ParkingSessionService_1 = require("../services/ParkingSessionService");
const router = (0, express_1.Router)();
const service = new ParkingSessionService_1.ParkingSessionService();
router.get('/sessions', async (req, res) => {
    const activeSessions = await service.getActiveSessions();
    res.json(activeSessions);
});
router.get('/spots', async (req, res) => {
    const spots = await service.getSpots();
    res.json(spots);
});
exports.default = router;
