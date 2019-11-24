import {
  Model, DataType, Column, UpdatedAt, CreatedAt,
} from 'sequelize-typescript';

class HelpOrder extends Model<HelpOrder> {
  @Column
  question!: string

  @Column
  answer!: string

  @Column
  answer_at!: Date

  @CreatedAt
  @Column
  createdAt!: Date;

  @UpdatedAt
  @Column
  updatedAt!: Date;

  public static init(sequelize) {
    super.init(
      {
        question: DataType.STRING,
        answer: DataType.STRING,
        answer_at: DataType.DATE,
      },
      {
        sequelize,
      },
    );
    return this;
  }

  public static associate(models) {
    this.belongsTo(models.Student, { foreignKey: 'student_id', as: 'student' });
  }
}

export default HelpOrder;
