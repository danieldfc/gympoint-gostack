import faker from 'faker';
import factory from 'factory-girl';

import User from '../src/app/models/User';
import Student from '../src/app/models/Student';
import Plan from '../src/app/models/Plan';

factory.define('User', User, {
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  provider: false,
});

factory.define('Student', Student, {
  name: faker.name.findName(),
  email: faker.internet.email(),
  age: faker.random.number({ min: 0 }),
  weight: faker.random.number({ min: 0 }),
  height: faker.random.number({ min: 0, max: 2.80 }),
});

factory.define('Plan', Plan, {
  title: faker.lorem.word(),
  duration: faker.lorem.slug(),
  price: faker.random.number({ min: 1, max: 150, precision: 2 ** -1 }),
});

export default factory;
