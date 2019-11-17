import {
  Model, DataType, Column, UpdatedAt, CreatedAt,
} from 'sequelize-typescript';
import bcrypt from 'bcryptjs';

import { UserInterface } from '../interfaces/user';

class User extends Model<User> {
  @Column
  name!: string;

  @Column
  email!: string;

  @Column
  password_hash!: string;

  @Column
  provider!: boolean;

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
        provider: DataType.BOOLEAN,
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
}

export default User;
