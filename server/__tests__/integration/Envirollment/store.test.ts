import request from 'supertest';
import app from '../../../src/app';

import { UserInterface } from '../../../src/app/interfaces/UserInterface';
import { StudentInterface } from '../../../src/app/interfaces/StudentInterface';
import { PlanInterface } from '../../../src/app/interfaces/PlanInterface';
import { EnrollmentInterface } from '../../../src/app/interfaces/EnrollmentInterface';

import truncate from '../../util/truncate';
import factory from '../../factory';

describe('Enrollment store', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should be able enrollment a student for a plan', async () => {
    const user: UserInterface = await factory.create('User');
    const student: StudentInterface = await factory.create('Student');
    const plan: PlanInterface = await factory.create('Plan');
    const enrollment: EnrollmentInterface = await factory.attrs('Enrollment', {
      student_id: student.id,
      plan_id: plan.id,
    });

    const response = await request(app)
      .post(`/enrollment/${student.id}/student`)
      .set('Authorization', `Bearer ${user.generateToken()}`)
      .send(enrollment);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
  });

  it('should not be able enrollment without fields', async () => {
    const user: UserInterface = await factory.create('User');

    const response = await request(app)
      .post('/enrollment/1/student')
      .set('Authorization', `Bearer ${user.generateToken()}`);

    expect(response.status).toBe(401);
    expect(response.body).toMatchObject({
      error: { message: 'Validations failures.' },
    });
  });

  it('should not be able enrollment with student but without a plan', async () => {
    const user: UserInterface = await factory.create('User');
    const student: StudentInterface = await factory.create('Student');
    const enrollment: EnrollmentInterface = await factory.attrs('Enrollment', {
      student_id: student.id,
    });

    const response = await request(app)
      .post(`/enrollment/${student.id}/student`)
      .set('Authorization', `Bearer ${user.generateToken()}`)
      .send(enrollment);

    expect(response.status).toBe(400);
    expect(response.body).toMatchObject({ error: { message: 'Plan does not exists' } });
  });

  it('should not be able enrollment with student but without a plan', async () => {
    const user: UserInterface = await factory.create('User');
    const student: StudentInterface = await factory.create('Student');
    const enrollment: EnrollmentInterface = await factory.attrs('Enrollment', {
      student_id: student.id,
    });

    const response = await request(app)
      .post(`/enrollment/${student.id}/student`)
      .set('Authorization', `Bearer ${user.generateToken()}`)
      .send(enrollment);

    expect(response.status).toBe(400);
    expect(response.body).toMatchObject({ error: { message: 'Plan does not exists' } });
  });
});
