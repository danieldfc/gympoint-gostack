import { Model } from 'sequelize-typescript';

export interface StudentInterface extends Model {
  name: string
  email: string
  age: number
  weight?: number
  height: number
}
