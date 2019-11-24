import {
  Model, DataType, Column, CreatedAt, UpdatedAt,
} from 'sequelize-typescript';

class Enrollment extends Model<Enrollment> {
  @Column
  start_date!: Date

  @Column
  end_date!: Date

  @Column
  price!: number

  @CreatedAt
  @Column
  createdAt!: Date

  @UpdatedAt
  @Column
  updatedAt!: Date

  public static init(sequelize) {
    super.init(
      {
        start_date: DataType.DATE,
        end_date: DataType.DATE,
        price: DataType.DOUBLE,
      },
      {
        sequelize,
      },
    );

    return this;
  }

  public static associate(models) {
    this.belongsTo(models.Student, {
      foreignKey: 'student_id',
      as: 'student',
    });
    this.belongsTo(models.Plan, {
      foreignKey: 'plan_id',
      as: 'plan',
    });
  }
}

export default Enrollment;
