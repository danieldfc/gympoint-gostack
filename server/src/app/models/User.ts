import {
  Model, DataType, Column, UpdatedAt, CreatedAt,
} from 'sequelize-typescript';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import authConfig from '../../config/auth';

import { UserInterface } from '../interfaces/UserInterface';

class User extends Model<User> {
  @Column
  name!: string;

  @Column
  email!: string;

  @Column
  password_hash!: string;

  @CreatedAt
  @Column
  createdAt!: Date;

  @UpdatedAt
  @Column
  updatedAt!: Date;

  public static init(sequelize) {
    super.init(
      {
        name: DataType.STRING,
        email: DataType.STRING,
        password: DataType.VIRTUAL,
        password_hash: DataType.STRING,
      },
      {
        sequelize,
        hooks: {
          beforeSave: async (user: UserInterface) => {
            if (user.password) {
              user.password_hash = await bcrypt.hash(user.password, 8);
            }
          },
        },
      },
    );

    return this;
  }

  public checkPassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password_hash);
  }

  public generateToken(): string {
    return jwt.sign({ id: this.id }, authConfig.secret, {
      expiresIn: authConfig.expiresIn,
    });
  }
}

export default User;
