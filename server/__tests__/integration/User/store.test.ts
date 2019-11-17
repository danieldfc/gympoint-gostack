import request from 'supertest';
import app from '../../../src/app';

import truncate from '../../util/truncate';
import factory from '../../factories';

describe('User store', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should be able register a new user', async () => {
    const user = await factory.attrs('User');
    const response = await request(app)
      .post('/users')
      .send(user);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
  });

  it('should not be able register a new user', async () => {
    const response = await request(app).post('/users');

    expect(response.status).toBe(401);
    expect(response.body.error.message).toBe('Validation failure.');
  });

  it('should not be able register a new user already existing', async () => {
    await factory.create('User', {
      email: 'daniel@test.com',
    });

    const userTwo = await factory.attrs('User', {
      email: 'daniel@test.com',
    });

    const response = await request(app)
      .post('/users')
      .send(userTwo);

    expect(response.status).toBe(400);
    expect(response.body.error.message).toBe('User already exists.');
  });
});
