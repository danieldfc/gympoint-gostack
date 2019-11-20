import {
  Model, Column, DataType, CreatedAt, UpdatedAt,
} from 'sequelize-typescript';

class Plan extends Model<Plan> {
  @Column
  title!: string

  @Column
  duration!: string

  @Column
  price!: number

  @CreatedAt
  @Column
  createdAt!: Date;

  @UpdatedAt
  @Column
  updatedAt!: Date;

  public static init(sequelize) {
    super.init(
      {
        title: DataType.STRING,
        duration: DataType.STRING,
        price: DataType.DOUBLE,
      },
      {
        sequelize,
      },
    );

    return this;
  }
}

export default Plan;
