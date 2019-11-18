import { Sequelize } from 'sequelize';

import User from '../app/models/user.model';

import dbConfig from '../config/database';

const models = [User];

class Database {
  public connection: Sequelize = new Sequelize(dbConfig)

  constructor() {
    this.init();
  }

  init() {
    models
      .map((model) => model.init(this.connection));
    // .map((model) => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();
