import faker from 'faker';
import { factory } from 'factory-girl';

import User from '../src/app/models/user.model';

factory.define('User', User, {
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  provider: false,
});

export default factory;
