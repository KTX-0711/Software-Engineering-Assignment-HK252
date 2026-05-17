"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const PaymentService_1 = require("../services/PaymentService");
const InvoiceService_1 = require("../services/InvoiceService");
const router = (0, express_1.Router)();
const paymentService = new PaymentService_1.PaymentService();
const invoiceService = new InvoiceService_1.InvoiceService();
router.get('/transactions', async (req, res) => {
    const txs = await paymentService.getTransactions();
    res.json(txs);
});
router.get('/invoices', async (req, res) => {
    const invs = await invoiceService.getInvoices();
    res.json(invs);
});
router.post('/invoices/pay', async (req, res) => {
    try {
        const userId = req.header('x-user-id');
        if (!userId)
            return res.status(401).json({ error: 'Missing user id' });
        const result = await paymentService.payInvoices(req.body.invoiceIds || [], userId);
        res.json(result);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
router.post('/cash-confirm', async (req, res) => {
    try {
        const { sessionId } = req.body;
        const userId = req.header('x-user-id') || 'unknown';
        await paymentService.confirmCashPayment(sessionId, userId);
        res.json({ success: true });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.default = router;
