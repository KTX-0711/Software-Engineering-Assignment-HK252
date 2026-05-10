"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ParkingSessionService_1 = require("../services/ParkingSessionService");
const PaymentService_1 = require("../services/PaymentService");
const InvoiceService_1 = require("../services/InvoiceService");
const IoTService_1 = require("../services/IoTService");
const router = (0, express_1.Router)();
const parkingService = new ParkingSessionService_1.ParkingSessionService();
const paymentService = new PaymentService_1.PaymentService();
const invoiceService = new InvoiceService_1.InvoiceService();
const iotService = new IoTService_1.IoTService();
// Gate routes re-added after previous placeholder edit
router.post('/gate/in', async (req, res) => {
    try {
        const { cardId, licensePlate } = req.body;
        if (!cardId || !licensePlate)
            throw new Error('Missing cardId or licensePlate');
        const session = await parkingService.gateIn(cardId, licensePlate);
        res.json(session);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
router.post('/gate/out/preview', async (req, res) => {
    try {
        const { cardId, mockCheckOutTime } = req.body;
        if (!cardId)
            throw new Error('Missing cardId');
        const session = await parkingService.previewGateOut(cardId, mockCheckOutTime);
        res.json(session);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
router.post('/gate/out', async (req, res) => {
    try {
        const { cardId, mockCheckOutTime } = req.body;
        if (!cardId)
            throw new Error('Missing cardId');
        const session = await parkingService.gateOut(cardId, mockCheckOutTime);
        res.json(session);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
// Mock IoT Trigger
router.post('/iot/trigger', async (req, res) => {
    try {
        const { sensorId, detectObject } = req.body;
        await iotService.trigger(sensorId, Boolean(detectObject));
        res.json({ success: true });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
router.get('/iot/devices', async (_req, res) => {
    try {
        const devices = await iotService.getDevices();
        res.json(devices);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
// Mock IoT Fault
router.post('/iot/fault', async (req, res) => {
    try {
        const { sensorId, status } = req.body;
        await iotService.setFault(sensorId, status);
        res.json({ success: true });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
// Mock BKPay Webhook
router.post('/bkpay-webhook', async (req, res) => {
    try {
        const { transactionId, status } = req.body;
        await paymentService.handleBKPayWebhook({ transactionId, status });
        res.json({ success: true });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
// Mock Monthly Invoice Job
router.post('/jobs/generate-monthly-invoice', async (req, res) => {
    try {
        const userId = req.header('x-user-id') || 'system';
        const invoice = await invoiceService.generateMonthlyInvoice(userId);
        res.json(invoice);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.default = router;
