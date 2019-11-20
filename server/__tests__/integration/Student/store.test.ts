import request from 'supertest';
import app from '../../../src/app';

import { UserInterface } from '../../../src/app/interfaces/UserInterface';
import { StudentInterface } from '../../../src/app/interfaces/StudentInterface';

import truncate from '../../util/truncate';
import factory from '../../factories';

describe('Student store', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should be able register a new student', async () => {
    const user: UserInterface = await factory.create('User');
    const student: StudentInterface = await factory.attrs('Student');

    const response = await request(app)
      .post('/students')
      .set('Authorization', `Bearer ${user.generateToken()}`)
      .send({
        name: student.name,
        email: student.email,
        age: student.age,
        weight: student.weight,
        height: student.height,
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
  });

  it('should not be able register a student duplicated', async () => {
    const user: UserInterface = await factory.create('User');

    await factory.create('Student', {
      email: 'daniel@test.com',
    });

    const student: StudentInterface = await factory.attrs('Student', {
      email: 'test@test.com',
    });

    const response = await request(app)
      .post('/students')
      .set('Authorization', `Bearer ${user.generateToken()}`)
      .send({
        name: student.name,
        email: 'daniel@test.com',
        age: student.age,
        weight: student.weight,
        height: student.height,
      });

    expect(response.status).toBe(400);
    expect(response.body).toMatchObject({ error: { message: 'Student already exists.' } });
  });

  it('should not be able register a new student without fields', async () => {
    const user: UserInterface = await factory.create('User');

    const response = await request(app)
      .post('/students')
      .set('Authorization', `Bearer ${user.generateToken()}`);

    expect(response.status).toBe(401);
    expect(response.body).toMatchObject({ error: { message: 'Validation failure.' } });
  });

  it('should not be able register student without authentication', async () => {
    const student: StudentInterface = await factory.attrs('Student');

    const response = await request(app)
      .post('/students')
      .send(student);

    expect(response.status).toBe(401);
    expect(response.body).toMatchObject({ error: { message: 'Token not found' } });
  });

  it('should not be able register student with authentication invalidated', async () => {
    const student: StudentInterface = await factory.attrs('Student');

    const response = await request(app)
      .post('/students')
      .set('Authorization', 'Bearer 123')
      .send(student);

    expect(response.status).toBe(401);
    expect(response.body).toMatchObject({ error: { message: 'Token invalidate.' } });
  });
});
