import request from 'supertest';
import app from '../../../src/app';

import { UserInterface } from '../../../src/app/interfaces/UserInterface';
import { PlanInterface } from '../../../src/app/interfaces/PlanInterface';

import truncate from '../../util/truncate';
import factory from '../../factory';

describe('Plan update', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should be able update a plan', async () => {
    const user: UserInterface = await factory.create('User');
    const plan: PlanInterface = await factory.create('Plan', {
      title: 'start',
    });
    const response = await request(app)
      .put(`/plans/${plan.id}`)
      .set('Authorization', `Bearer ${user.generateToken()}`)
      .send({
        title: 'gold',
        duration: plan.duration,
        price: plan.price,
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
  });

  it('should not be able update a plan not found', async () => {
    const user: UserInterface = await factory.create('User');
    const response = await request(app)
      .put('/plans/1')
      .set('Authorization', `Bearer ${user.generateToken()}`)
      .send({
        title: 'gold',
        duration: 1,
        price: 120,
      });

    expect(response.status).toBe(400);
    expect(response.body).toMatchObject({ error: { message: 'Plan not found' } });
  });

  it('should not be able update a plan already exists', async () => {
    const user: UserInterface = await factory.create('User');
    const plan: PlanInterface = await factory.create('Plan', {
      title: 'gold',
    });
    await factory.create('Plan', {
      title: 'start',
    });
    const response = await request(app)
      .put(`/plans/${plan.id}`)
      .set('Authorization', `Bearer ${user.generateToken()}`)
      .send({
        title: 'start',
        duration: plan.duration,
        price: plan.price,
      });

    expect(response.status).toBe(400);
    expect(response.body).toMatchObject({ error: { message: 'Plan already exists.' } });
  });

  it('should not be able update a plan without fields', async () => {
    const user: UserInterface = await factory.create('User');
    const plan: PlanInterface = await factory.create('Plan');
    const response = await request(app)
      .put(`/plans/${plan.id}`)
      .set('Authorization', `Bearer ${user.generateToken()}`)
      .send({
        title: '',
        duration: 0,
        price: 0,
      });

    expect(response.status).toBe(401);
    expect(response.body).toMatchObject({ error: { message: 'Validation failure.' } });
  });
});
