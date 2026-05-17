"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const parking_routes_1 = __importDefault(require("./routes/parking.routes"));
const payment_routes_1 = __importDefault(require("./routes/payment.routes"));
const iot_routes_1 = __importDefault(require("./routes/iot.routes"));
const admin_routes_1 = __importDefault(require("./routes/admin.routes"));
const vehicle_routes_1 = __importDefault(require("./routes/vehicle.routes"));
const subscription_routes_1 = __importDefault(require("./routes/subscription.routes"));
const notification_routes_1 = __importDefault(require("./routes/notification.routes"));
const mock_routes_1 = __importDefault(require("./routes/mock.routes"));
const app = (0, express_1.default)();
const port = 3001;
app.use((0, cors_1.default)());
app.use(express_1.default.json({ limit: '50mb' }));
app.use(express_1.default.urlencoded({ limit: '50mb', extended: true }));
// Main business routes
app.use('/api/auth', auth_routes_1.default);
app.use('/api/parking', parking_routes_1.default);
app.use('/api/payments', payment_routes_1.default);
app.use('/api/iot', iot_routes_1.default);
app.use('/api/vehicles', vehicle_routes_1.default);
app.use('/api/subscriptions', subscription_routes_1.default);
app.use('/api/notifications', notification_routes_1.default);
app.use('/api/admin', admin_routes_1.default);
// Mock demo routes
app.use('/api/mock', mock_routes_1.default);
// Placeholder for other routes (to be implemented in next tasks)
app.get('/health', (req, res) => res.send('OK'));
app.listen(port, () => {
    console.log(`HCMUT-SPMS Backend listening at http://localhost:${port}`);
});
