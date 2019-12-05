import request from 'supertest';
import app from '../../../src/app';

import { UserInterface } from '../../../src/app/interfaces/UserInterface';
import { StudentInterface } from '../../../src/app/interfaces/StudentInterface';
import { CheckinInterface } from '../../../src/app/interfaces/CheckinInterface';

import truncate from '../../util/truncate';
import factory from '../../factory';

describe('Checkin index', () => {
  beforeEach(async () => {
    await truncate();
  });

  xit('should be able show all checkin student', async () => {
    const user: UserInterface = await factory.create('User');
    const student: StudentInterface = await factory.create('Student');
    const checkin: CheckinInterface = await factory.create('Checkin', {
      student_id: student.id,
    });

    const response = await request(app)
      .get(`/students/${student.id}/checkins`)
      .set('Authorization', `Bearer ${user.generateToken()}`);

    expect(response.status).toBe(200);
    expect(response.body[0].id).toEqual(checkin.id);
  });
});
