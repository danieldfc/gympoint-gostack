import request from 'supertest';
import app from '../../../src/app';

import { UserInterface } from '../../../src/app/interfaces/UserInterface';
import { StudentInterface } from '../../../src/app/interfaces/StudentInterface';

import truncate from '../../util/truncate';
import factory from '../../factory';

describe('Checkin store', () => {
  beforeEach(async () => {
    await truncate();
  });

  xit('should be able to checkin student', async () => {
    const user: UserInterface = await factory.create('User');
    const student: StudentInterface = await factory.create('Student');
    const response = await request(app)
      .post(`/students/${student.id}/checkins`)
      .set('Authorization', `Bearer ${user.generateToken()}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
  });

  xit('should not be able to checkin student not found', async () => {
    const user: UserInterface = await factory.create('User');
    const response = await request(app)
      .post('/students/1/checkins')
      .set('Authorization', `Bearer ${user.generateToken()}`);

    expect(response.status).toBe(400);
    expect(response.body).toMatchObject({
      error: { message: 'Student does not exists' },
    });
  });

  xit('should not be able to create checkin to student with more of 5', async () => {
    const user: UserInterface = await factory.create('User');
    const student: StudentInterface = await factory.create('Student');

    await factory.create('Checkin', {
      student_id: student.id,
    });
    await factory.create('Checkin', {
      student_id: student.id,
    });
    await factory.create('Checkin', {
      student_id: student.id,
    });
    await factory.create('Checkin', {
      student_id: student.id,
    });

    const response = await request(app)
      .post(`/students/${student.id}/checkins`)
      .set('Authorization', `Bearer ${user.generateToken()}`);

    expect(response.status).toBe(400);
    expect(response.body).toMatchObject({
      error: { message: 'You can only check-in 5 times every 7 days!' },
    });
  });
});
