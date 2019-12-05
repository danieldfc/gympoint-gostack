import request from 'supertest';
import app from '../../../src/app';

import { UserInterface } from '../../../src/app/interfaces/UserInterface';
import { StudentInterface } from '../../../src/app/interfaces/StudentInterface';
import { HelpOrderInterface } from '../../../src/app/interfaces/HelpOrderInterface';

import truncate from '../../util/truncate';
import factory from '../../factory';

describe('Answer store', () => {
  beforeEach(async () => {
    await truncate();
  });

  xit('should be able to answer a student with a request for help', async () => {
    const user: UserInterface = await factory.create('User');
    const student: StudentInterface = await factory.create('Student');
    const help_order: HelpOrderInterface = await factory.create('HelpOrder', {
      student_id: student.id,
    });

    const response = await request(app)
      .post(`/help-orders/${help_order.id}/answer`)
      .set('Authorization', `Bearer ${user.generateToken()}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
  });

  xit('should not be able to answer a student without a request for help', async () => {
    const user: UserInterface = await factory.create('User');
    const response = await request(app)
      .post('/help-orders/1/answer')
      .set('Authorization', `Bearer ${user.generateToken()}`);

    expect(response.status).toBe(400);
    expect(response.body).toMatchObject({
      error: { message: 'Help Order does not exists!' },
    });
  });

  xit('should not be able to answer a student with a request for help already exists', async () => {
    const user: UserInterface = await factory.create('User');
    const student: StudentInterface = await factory.create('Student');
    const help_order: HelpOrderInterface = await factory.create('HelpOrder', {
      student_id: student.id,
      answer: 'Resposta para estudante',
      answer_at: new Date(),
    });

    const response = await request(app)
      .post(`/help-orders/${help_order.id}/answer`)
      .set('Authorization', `Bearer ${user.generateToken()}`);

    expect(response.status).toBe(400);
    expect(response.body).toMatchObject({ error: { message: 'Help Order already answered!' } });
  });
});
