import request from 'supertest';
import app from '../../../src/app';

import { UserInterface } from '../../../src/app/interfaces/UserInterface';
import { PlanInterface } from '../../../src/app/interfaces/PlanInterface';

import truncate from '../../util/truncate';
import factory from '../../factories';

describe('Plan index', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should be able to show all plans', async () => {
    const user: UserInterface = await factory.create('User');
    const plan: PlanInterface = await factory.create('Plan');
    const response = await request(app)
      .get('/plans')
      .set('Authorization', `Bearer ${user.generateToken()}`);

    expect(response.status).toBe(200);
    expect(response.body[0].id).toEqual(plan.id);
  });
});
