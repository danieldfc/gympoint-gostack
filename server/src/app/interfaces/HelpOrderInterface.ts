import { Model } from 'sequelize-typescript';

import { StudentInterface } from './StudentInterface';

export interface HelpOrderInterface extends Model {
  question: string
  answer?: string
  answer_at?: Date
  student?: StudentInterface | null | undefined
}
