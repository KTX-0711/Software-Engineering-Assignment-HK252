"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockSSOConnector = void 0;
class MockSSOConnector {
    async login(username, password) {
        if (!username || !password)
            throw new Error('Invalid credentials');
        return { username };
    }
}
exports.MockSSOConnector = MockSSOConnector;
