"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const IoTService_1 = require("../services/IoTService");
const router = (0, express_1.Router)();
const service = new IoTService_1.IoTService();
router.get('/devices', async (req, res) => {
    const devices = await service.getDevices();
    res.json(devices);
});
exports.default = router;
