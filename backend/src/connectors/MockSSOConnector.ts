export class MockSSOConnector {
  async login(username: string, password: string) {
    if (!username || !password) throw new Error('Invalid credentials');
    return { username };
  }
}
