const request = require('supertest');

jest.mock('../src/services/authService', () => ({
  register: jest.fn(),
  login: jest.fn(),
}));

const app = require('../src/app');
const auth = require('../src/services/authService');

describe('authentication routes', () => {
  test('registers a user', async () => {
    auth.register.mockResolvedValue({ id: 1, name: 'Sam', email: 'sam@example.com' });
    const response = await request(app).post('/api/auth/register').send({
      name: 'Sam', email: 'sam@example.com', password: 'example-pass',
    });
    expect(response.status).toBe(201);
    expect(response.body.user.email).toBe('sam@example.com');
  });

  test('returns a token after login', async () => {
    auth.login.mockResolvedValue({ token: 'signed-token', user: { id: 1 } });
    const response = await request(app).post('/api/auth/login').send({
      email: 'sam@example.com', password: 'example-pass',
    });
    expect(response.status).toBe(200);
    expect(response.body.token).toBe('signed-token');
  });
});
