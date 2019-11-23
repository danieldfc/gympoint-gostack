import { Model } from 'sequelize-typescript';

export interface CheckinInterface extends Model {
  student_id: number
}
