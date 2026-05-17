"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PricingPolicyService = void 0;
const JsonRepository_1 = require("../repositories/JsonRepository");
const MAX_FEE = 1000000;
const DEFAULT_POLICY = {
    id: 'default',
    guestPerVisitFee: 4000,
    studentPerVisitFee: 3000,
    monthlyDiscountRate: 0.8
};
class PricingPolicyService {
    constructor() {
        this.pricingRepo = new JsonRepository_1.JsonRepository('pricingPolicy.json');
    }
    async getPolicy() {
        const policies = await this.pricingRepo.findAll();
        const policy = this.normalizePolicy(policies[0]);
        return this.withMonthlyFee(policy);
    }
    async updatePolicy(input) {
        const current = await this.getPolicy();
        const updated = {
            id: current.id || 'default',
            guestPerVisitFee: this.validateFee(input.guestPerVisitFee ?? current.guestPerVisitFee, 'Phi khach vang lai'),
            studentPerVisitFee: this.validateFee(input.studentPerVisitFee ?? current.studentPerVisitFee, 'Phi sinh vien'),
            monthlyDiscountRate: this.validateDiscount(input.monthlyDiscountRate ?? current.monthlyDiscountRate)
        };
        await this.pricingRepo.save(updated);
        return this.withMonthlyFee(updated);
    }
    calculateMonthlyFee(policy) {
        return Math.round(policy.studentPerVisitFee * 30 * policy.monthlyDiscountRate);
    }
    feeForCard(card, account, policy) {
        if (card?.type === 'GUEST')
            return policy.guestPerVisitFee;
        if (account?.accountCategory === 'LECTURER' || account?.accountCategory === 'SCHOOL_STAFF')
            return 0;
        return policy.studentPerVisitFee;
    }
    isFreeAccount(account) {
        return account?.accountCategory === 'LECTURER' || account?.accountCategory === 'SCHOOL_STAFF';
    }
    withMonthlyFee(policy) {
        return {
            ...policy,
            monthlyFee: this.calculateMonthlyFee(policy)
        };
    }
    normalizePolicy(policy) {
        if (!policy)
            return DEFAULT_POLICY;
        return {
            id: policy.id || 'default',
            guestPerVisitFee: this.numberOrDefault(policy.guestPerVisitFee, 4000),
            studentPerVisitFee: this.numberOrDefault(policy.studentPerVisitFee ?? policy.baseFee, 3000),
            monthlyDiscountRate: this.numberOrDefault(policy.monthlyDiscountRate, 0.8)
        };
    }
    numberOrDefault(value, fallback) {
        return typeof value === 'number' && Number.isFinite(value) ? value : fallback;
    }
    validateFee(value, fieldName) {
        if (typeof value !== 'number' || !Number.isFinite(value) || !Number.isInteger(value)) {
            throw new Error(`${fieldName} phai la so nguyen`);
        }
        if (value < 0 || value > MAX_FEE)
            throw new Error(`${fieldName} khong hop le`);
        return value;
    }
    validateDiscount(value) {
        if (typeof value !== 'number' || !Number.isFinite(value))
            throw new Error('Ty le ve thang phai la so');
        if (value <= 0 || value > 1)
            throw new Error('Ty le ve thang phai lon hon 0 va khong vuot qua 1');
        return value;
    }
}
exports.PricingPolicyService = PricingPolicyService;
