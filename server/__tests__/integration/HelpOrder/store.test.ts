import request from 'supertest';
import app from '../../../src/app';

import { UserInterface } from '../../../src/app/interfaces/UserInterface';
import { StudentInterface } from '../../../src/app/interfaces/StudentInterface';
import { HelpOrderInterface } from '../../../src/app/interfaces/HelpOrderInterface';

import truncate from '../../util/truncate';
import factory from '../../factory';

describe('HelpOrder store', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should be able register a new help order', async () => {
    const user: UserInterface = await factory.create('User');
    const student: StudentInterface = await factory.create('Student');
    const help_order: HelpOrderInterface = await factory.attrs('HelpOrder');
    const response = await request(app)
      .post(`/students/${student.id}/help-orders`)
      .set('Authorization', `Bearer ${user.generateToken()}`)
      .send(help_order);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
  });

  it('should not be able register a new help order without student', async () => {
    const user: UserInterface = await factory.create('User');
    const help_order: HelpOrderInterface = await factory.attrs('HelpOrder');
    const response = await request(app)
      .post('/students/1/help-orders')
      .set('Authorization', `Bearer ${user.generateToken()}`)
      .send(help_order);

    expect(response.status).toBe(400);
    expect(response.body).toMatchObject({ error: { message: 'Student does not exists' } });
  });
});
