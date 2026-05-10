import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes';
import parkingRoutes from './routes/parking.routes';
import paymentRoutes from './routes/payment.routes';
import iotRoutes from './routes/iot.routes';
import adminRoutes from './routes/admin.routes';
import vehicleRoutes from './routes/vehicle.routes';
import subscriptionRoutes from './routes/subscription.routes';
import notificationRoutes from './routes/notification.routes';
import mockRoutes from './routes/mock.routes';

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Main business routes
app.use('/api/auth', authRoutes);
app.use('/api/parking', parkingRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/iot', iotRoutes);
app.use('/api/vehicles', vehicleRoutes);
app.use('/api/subscriptions', subscriptionRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/admin', adminRoutes);

// Mock demo routes
app.use('/api/mock', mockRoutes);

// Placeholder for other routes (to be implemented in next tasks)
app.get('/health', (req, res) => res.send('OK'));

app.listen(port, () => {
  console.log(`HCMUT-SPMS Backend listening at http://localhost:${port}`);
});
