import { Model } from 'sequelize-typescript';

export interface EnrollmentInterface extends Model {
  student_id: number
  plan_id: number
  start_date: Date
  end_date: Date
  price: number
}
