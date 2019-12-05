import request from 'supertest';
import app from '../../../src/app';

import { UserInterface } from '../../../src/app/interfaces/UserInterface';

import truncate from '../../util/truncate';
import factory from '../../factory';

describe('Session store', () => {
  beforeEach(async () => {
    await truncate();
  });

  xit('should return JWT token when authenticated', async () => {
    const user: UserInterface = await factory.create('User', {
      password: '123456',
    });

    const response = await request(app)
      .post('/sessions')
      .send({
        email: user.email,
        password: '123456',
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
  });

  xit('should not be able create a new session without fields', async () => {
    const response = await request(app)
      .post('/sessions');

    expect(response.status).toBe(401);
    expect(response.body).toMatchObject({ error: { message: 'Validation failure.' } });
  });

  xit('should not be able create a new session without user', async () => {
    const response = await request(app)
      .post('/sessions')
      .send({
        email: 'test@test.com',
        password: '123456',
      });

    expect(response.status).toBe(400);
    expect(response.body.error.message).toBe('User not found.');
  });

  xit('should not authenticate with invalid credentials', async () => {
    const user: UserInterface = await factory.create('User', {
      password: '123456',
    });

    const response = await request(app)
      .post('/sessions')
      .send({
        email: user.email,
        password: '123123',
      });

    expect(response.status).toBe(401);
    expect(response.body).toMatchObject({ error: { message: 'Password does not match' } });
  });
});
