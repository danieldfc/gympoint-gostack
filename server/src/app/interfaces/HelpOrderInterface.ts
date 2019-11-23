import { Model } from 'sequelize-typescript';

export interface HelpOrderInterface extends Model {
  question: string
  answer?: string
  answer_at?: Date
}
