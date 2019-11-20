import request from 'supertest';
import app from '../../../src/app';

import { UserInterface } from '../../../src/app/interfaces/UserInterface';
import { PlanInterface } from '../../../src/app/interfaces/PlanInterface';

import truncate from '../../util/truncate';
import factory from '../../factories';

describe('Plan show', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should be able to show a plan', async () => {
    const user: UserInterface = await factory.create('User');
    const plan: PlanInterface = await factory.create('Plan');
    const response = await request(app)
      .get(`/plans/${plan.id}`)
      .set('Authorization', `Bearer ${user.generateToken()}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
  });

  it('should not be able to show a plan not found', async () => {
    const user: UserInterface = await factory.create('User');
    const response = await request(app)
      .get('/plans/1')
      .set('Authorization', `Bearer ${user.generateToken()}`);

    expect(response.status).toBe(400);
    expect(response.body).toMatchObject({ error: { message: 'Plan not found' } });
  });
});
