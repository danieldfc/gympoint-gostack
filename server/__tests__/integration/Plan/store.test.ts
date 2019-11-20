import request from 'supertest';
import app from '../../../src/app';

import { UserInterface } from '../../../src/app/interfaces/UserInterface';
import { PlanInterface } from '../../../src/app/interfaces/PlanInterface';

import truncate from '../../util/truncate';
import factory from '../../factories';

describe('Plan store', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should be able register a new plan', async () => {
    const user: UserInterface = await factory.create('User');
    const plan: PlanInterface = await factory.attrs('Plan');
    const response = await request(app)
      .post('/plans')
      .set('Authorization', `Bearer ${user.generateToken()}`)
      .send(plan);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
  });

  it('should not be able register a new plan without fields', async () => {
    const user: UserInterface = await factory.create('User');
    const response = await request(app)
      .post('/plans')
      .set('Authorization', `Bearer ${user.generateToken()}`);

    expect(response.status).toBe(401);
    expect(response.body).toMatchObject({ error: { message: 'Validation failure.' } });
  });

  it('should not be able register a new plan with title invalid', async () => {
    const user: UserInterface = await factory.create('User');

    await factory.create('Plan', {
      title: 'gold',
    });
    const plan: PlanInterface = await factory.attrs('Plan');

    const response = await request(app)
      .post('/plans')
      .set('Authorization', `Bearer ${user.generateToken()}`)
      .send({
        title: 'gold',
        duration: plan.duration,
        price: plan.price,
      });

    expect(response.status).toBe(400);
    expect(response.body).toMatchObject({ error: { message: 'Title invalid' } });
  });
});
