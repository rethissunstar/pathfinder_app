const request = require('supertest');
const express = require('express');
const userRoutes = require('../../src/users/User.routes');

// Mock the controller methods
jest.mock('../../src/users/User.controller', () => ({
  register: jest.fn((req, res) => res.status(201).json({ message: 'Mock register called' })),
  login: jest.fn((req, res) => res.status(200).json({ message: 'Mock login called' }))
}));

describe('User Routes', () => {
  let app;

  beforeAll(() => {
    app = express();
    app.use(express.json());
    app.use('/api/users', userRoutes);
  });

  it('should route POST /api/users/register to userController.register', async () => {
    const response = await request(app)
      .post('/api/users/register')
      .send({ userName: 'tester', password: 'pass123', email: 'tester@example.com' });

    expect(response.status).toBe(201);
    expect(response.body.message).toBe('Mock register called');
  });

  it('should route POST /api/users/login to userController.login', async () => {
    const response = await request(app)
      .post('/api/users/login')
      .send({ userName: 'tester', password: 'pass123' });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Mock login called');
  });
});
