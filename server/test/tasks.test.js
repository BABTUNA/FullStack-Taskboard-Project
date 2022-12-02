const request = require('supertest');

jest.mock('../src/middleware/authenticate', () => (req, res, next) => {
  req.userId = 7;
  next();
});
jest.mock('../src/repositories/taskRepository', () => ({
  create: jest.fn(), list: jest.fn(), update: jest.fn(), remove: jest.fn(),
}));

const app = require('../src/app');
const tasks = require('../src/repositories/taskRepository');

describe('task routes', () => {
  test('lists the signed-in users tasks', async () => {
    tasks.list.mockResolvedValue([{ id: 2, title: 'Outline release' }]);
    const response = await request(app).get('/api/tasks');
    expect(response.body.tasks).toHaveLength(1);
  });

  test('creates and removes a task', async () => {
    tasks.create.mockResolvedValue({ id: 3, title: 'Review notes' });
    tasks.remove.mockResolvedValue(true);
    expect((await request(app).post('/api/tasks').send({ title: 'Review notes' })).status).toBe(201);
    expect((await request(app).delete('/api/tasks/3')).status).toBe(204);
  });

  test('returns not found for an unknown task', async () => {
    tasks.update.mockResolvedValue(undefined);
    expect((await request(app).put('/api/tasks/99').send({ title: 'Missing' })).status).toBe(404);
  });
});
