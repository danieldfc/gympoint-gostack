import { Model } from 'sequelize-typescript';

export interface PlanInterface extends Model {
  title: string
  duration: string
  price: number
}
