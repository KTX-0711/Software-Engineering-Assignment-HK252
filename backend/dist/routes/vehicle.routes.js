"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const VehicleService_1 = require("../services/VehicleService");
const router = (0, express_1.Router)();
const vehicleService = new VehicleService_1.VehicleService();
router.get('/my', async (req, res) => {
    try {
        const userId = req.header('x-user-id');
        if (!userId)
            return res.status(401).json({ error: 'Missing user id' });
        const vehicles = await vehicleService.getCustomerVehicles(userId);
        res.json(vehicles);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
router.post('/', async (req, res) => {
    try {
        const userId = req.header('x-user-id');
        if (!userId)
            return res.status(401).json({ error: 'Missing user id' });
        const vehicle = await vehicleService.createRegistration(userId, req.body);
        res.status(201).json(vehicle);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
router.delete('/:id', async (req, res) => {
    try {
        const userId = req.header('x-user-id');
        if (!userId)
            return res.status(401).json({ error: 'Missing user id' });
        const result = await vehicleService.deleteVehicle(userId, req.params.id);
        res.json(result);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.default = router;
