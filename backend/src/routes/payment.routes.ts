import { Router } from 'express';
import { PaymentService } from '../services/PaymentService';
import { InvoiceService } from '../services/InvoiceService';

const router = Router();
const paymentService = new PaymentService();
const invoiceService = new InvoiceService();

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
    if (!userId) return res.status(401).json({ error: 'Missing user id' });

    const result = await paymentService.payInvoices(req.body.invoiceIds || [], userId);
    res.json(result);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

router.post('/cash-confirm', async (req, res) => {
  try {
    const { sessionId } = req.body;
    const userId = req.header('x-user-id') || 'unknown';
    await paymentService.confirmCashPayment(sessionId, userId);
    res.json({ success: true });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
