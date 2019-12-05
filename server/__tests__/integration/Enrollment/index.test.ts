import request from 'supertest';
import app from '../../../src/app';

import { UserInterface } from '../../../src/app/interfaces/UserInterface';
import { StudentInterface } from '../../../src/app/interfaces/StudentInterface';
import { PlanInterface } from '../../../src/app/interfaces/PlanInterface';
import { EnrollmentInterface } from '../../../src/app/interfaces/EnrollmentInterface';

import truncate from '../../util/truncate';
import factory from '../../factory';

describe('Enrollment index', () => {
  beforeEach(async () => {
    await truncate();
  });

  xit('should be able show all enrollment a student for a plan', async () => {
    const user: UserInterface = await factory.create('User');
    const student: StudentInterface = await factory.create('Student');
    const plan: PlanInterface = await factory.create('Plan');
    const enrollment: EnrollmentInterface = await factory.create('Enrollment', {
      student_id: student.id,
      plan_id: plan.id,
    });

    const response = await request(app)
      .get('/enrollment')
      .set('Authorization', `Bearer ${user.generateToken()}`);

    expect(response.status).toBe(200);
    expect(response.body[0].id).toEqual(enrollment.id);
  });
});
