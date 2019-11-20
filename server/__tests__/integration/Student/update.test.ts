import request from 'supertest';
import app from '../../../src/app';

import { UserInterface } from '../../../src/app/interfaces/UserInterface';
import { StudentInterface } from '../../../src/app/interfaces/StudentInterface';

import truncate from '../../util/truncate';
import factory from '../../factories';

describe('Student update', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should be able update a student', async () => {
    const user: UserInterface = await factory.create('User');
    const student: StudentInterface = await factory.create('Student', {
      email: 'test@test.com',
    });

    const response = await request(app)
      .post(`/students/${student.id}`)
      .set('Authorization', `Bearer ${user.generateToken()}`)
      .send({
        name: 'Daniel',
        email: 'daniel@test.com',
        age: 20,
        height: 1.93,
        weight: 75.3,
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
  });

  it('should not be able update a student without fields types success', async () => {
    const user: UserInterface = await factory.create('User');

    const student: StudentInterface = await factory.create('Student');

    const response = await request(app)
      .post(`/students/${student.id}`)
      .set('Authorization', `Bearer ${user.generateToken()}`)
      .send({
        name: '',
        email: '',
        age: 0,
        weight: 0,
        height: 0,
      });

    expect(response.status).toBe(401);
    expect(response.body).toMatchObject({ error: { message: 'Validation failure.' } });
  });
});
