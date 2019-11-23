import {
  Model, CreatedAt, UpdatedAt, Column,
} from 'sequelize-typescript';

class Checkin extends Model<Checkin> {
  @CreatedAt
  @Column
  createdAt!: Date;

  @UpdatedAt
  @Column
  updatedAt!: Date;

  static init(sequelize) {
    super.init(
      {},
      {
        sequelize,
      },
    );
    return this;
  }

  protected static associate(models) {
    this.belongsTo(models.Student, { foreignKey: 'student_id', as: 'student' });
  }
}

export default Checkin;
