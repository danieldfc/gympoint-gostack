import {
  Model, Column, DataType, CreatedAt, UpdatedAt,
} from 'sequelize-typescript';

class Student extends Model<Student> {
  @Column
  name!: string

  @Column
  email!: string

  @Column
  age!: number

  @Column
  weight!: number

  @Column
  height!: number

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
        age: DataType.INTEGER,
        weight: DataType.DOUBLE,
        height: DataType.DOUBLE,
      },
      {
        sequelize,
      },
    );

    return this;
  }
}

export default Student;
