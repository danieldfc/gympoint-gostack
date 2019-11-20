import { Model } from 'sequelize-typescript';

export interface UserInterface extends Model {
  name: string
  email: string
  password?: string
  password_hash: string
  checkPassword(): boolean
  generateToken(): void
}
