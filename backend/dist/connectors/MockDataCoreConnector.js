"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockDataCoreConnector = void 0;
class MockDataCoreConnector {
    // Simulates fetching extended user profile
    async getProfile(username) {
        return {
            fullName: username.includes('.') ? username.split('.').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ') : 'Demo User',
            studentId: username.includes('231') ? username.split('nguyen')[1] : undefined
        };
    }
}
exports.MockDataCoreConnector = MockDataCoreConnector;
