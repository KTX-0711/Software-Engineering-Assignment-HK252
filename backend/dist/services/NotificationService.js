"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationService = void 0;
const JsonRepository_1 = require("../repositories/JsonRepository");
const DAY_MS = 24 * 60 * 60 * 1000;
const INVOICE_DUE_SOON_DAYS = 3;
const MONTHLY_EXPIRING_DAYS = 5;
class NotificationService {
    constructor() {
        this.notificationRepo = new JsonRepository_1.JsonRepository('notifications.json');
        this.accountRepo = new JsonRepository_1.JsonRepository('accounts.json');
        this.invoiceRepo = new JsonRepository_1.JsonRepository('invoices.json');
    }
    async createNotification(input) {
        if (input.dedupeKey) {
            const existing = await this.notificationRepo.findOne(item => item.dedupeKey === input.dedupeKey);
            if (existing)
                return existing;
        }
        const notification = {
            id: `noti_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
            audience: input.audience,
            userId: input.userId,
            type: input.type,
            title: input.title,
            message: input.message,
            level: input.level,
            read: false,
            createdAt: new Date().toISOString(),
            link: input.link,
            dedupeKey: input.dedupeKey
        };
        await this.notificationRepo.save(notification);
        return notification;
    }
    async getCustomerNotifications(userId) {
        await this.syncCustomerNotifications(userId);
        const notifications = await this.notificationRepo.findAll();
        return notifications
            .filter(item => item.audience === 'CUSTOMER' && item.userId === userId)
            .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }
    async getAdminNotifications() {
        const notifications = await this.notificationRepo.findAll();
        return notifications
            .filter(item => item.audience === 'ADMIN')
            .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }
    async markRead(notificationId, userId, role = 'CUSTOMER') {
        const notification = await this.notificationRepo.findById(notificationId);
        if (!notification)
            throw new Error('Notification not found');
        if (notification.audience === 'CUSTOMER' && notification.userId !== userId)
            throw new Error('Khong co quyen cap nhat thong bao nay');
        if (notification.audience === 'ADMIN' && role !== 'ADMIN')
            throw new Error('Khong co quyen cap nhat thong bao nay');
        return this.notificationRepo.update(notificationId, { read: true });
    }
    async syncCustomerNotifications(userId) {
        const [account, invoices] = await Promise.all([
            this.accountRepo.findById(userId),
            this.invoiceRepo.findAll()
        ]);
        const now = new Date();
        for (const invoice of invoices.filter(item => item.customerId === userId && item.status === 'Unpaid')) {
            const dueDate = new Date(invoice.dueDate);
            const daysLeft = Math.ceil((dueDate.getTime() - now.getTime()) / DAY_MS);
            if (dueDate < now) {
                await this.createNotification({
                    audience: 'CUSTOMER',
                    userId,
                    type: 'INVOICE_OVERDUE',
                    title: 'Hóa đơn đã quá hạn',
                    message: `Hóa đơn ${invoice.id} đã quá hạn. Vui lòng thanh toán ${invoice.totalAmount.toLocaleString('vi-VN')} VND để tiếp tục sử dụng dịch vụ ổn định.`,
                    level: 'ERROR',
                    link: '/customer/payment',
                    dedupeKey: `invoice-overdue-${invoice.id}`
                });
            }
            else if (daysLeft <= INVOICE_DUE_SOON_DAYS) {
                await this.createNotification({
                    audience: 'CUSTOMER',
                    userId,
                    type: 'INVOICE_DUE_SOON',
                    title: 'Hóa đơn sắp đến hạn',
                    message: `Hóa đơn ${invoice.id} cần thanh toán trong ${Math.max(daysLeft, 1)} ngày tới. Số tiền cần thanh toán là ${invoice.totalAmount.toLocaleString('vi-VN')} VND.`,
                    level: 'WARNING',
                    link: '/customer/payment',
                    dedupeKey: `invoice-due-soon-${invoice.id}`
                });
            }
        }
        if (!account?.planExpiresAt || account.parkingPlan !== 'MONTH')
            return;
        const expiresAt = new Date(account.planExpiresAt);
        const daysLeft = Math.ceil((expiresAt.getTime() - now.getTime()) / DAY_MS);
        if (expiresAt < now) {
            await this.createNotification({
                audience: 'CUSTOMER',
                userId,
                type: 'MONTHLY_EXPIRED',
                title: 'Vé tháng đã hết hạn',
                message: 'Vé tháng của bạn đã hết hạn. Các lượt gửi xe tiếp theo sẽ được tính theo hình thức gửi xe theo lượt.',
                level: 'ERROR',
                link: '/customer/subscription',
                dedupeKey: `monthly-expired-${userId}-${account.planExpiresAt}`
            });
        }
        else if (daysLeft <= MONTHLY_EXPIRING_DAYS) {
            await this.createNotification({
                audience: 'CUSTOMER',
                userId,
                type: 'MONTHLY_EXPIRING',
                title: 'Vé tháng sắp hết hạn',
                message: `Vé tháng của bạn còn ${Math.max(daysLeft, 1)} ngày hiệu lực. Hãy kiểm tra gói gửi xe để không bị gián đoạn quyền lợi.`,
                level: 'WARNING',
                link: '/customer/subscription',
                dedupeKey: `monthly-expiring-${userId}-${account.planExpiresAt}`
            });
        }
    }
}
exports.NotificationService = NotificationService;
