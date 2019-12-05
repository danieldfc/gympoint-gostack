import request from 'supertest';
import app from '../../../src/app';

import { UserInterface } from '../../../src/app/interfaces/UserInterface';
import { StudentInterface } from '../../../src/app/interfaces/StudentInterface';
import { HelpOrderInterface } from '../../../src/app/interfaces/HelpOrderInterface';

import truncate from '../../util/truncate';
import factory from '../../factory';

describe('HelpOrder index', () => {
  beforeEach(async () => {
    await truncate();
  });

  xit('should be able register a new plan', async () => {
    const user: UserInterface = await factory.create('User');
    const student: StudentInterface = await factory.create('Student');
    const help_order: HelpOrderInterface = await factory.create('HelpOrder', {
      student_id: student.id,
    });
    const response = await request(app)
      .get(`/students/${student.id}/help-orders`)
      .set('Authorization', `Bearer ${user.generateToken()}`);

    expect(response.status).toBe(200);
    expect(response.body[0].id).toEqual(help_order.id);
  });
});
