import { User } from '../user/types';

export enum AuthTypes {
  SIGN_IN_REQUEST = '@auth/SIGN_IN_REQUEST',
  SIGN_IN_SUCCESS = '@auth/SIGN_IN_SUCCESS',
  SIGN_UP_REQUEST = '@auth/SIGN_UP_REQUEST',
  SIGN_FAILURE = '@auth/SIGN_FAILURE',
  SIGN_OUT = '@auth/SIGN_OUT',
}

export interface Auth {
  token: string
  user: User
}

export interface AuthState {
  readonly loading: boolean
  readonly token: string | null
  readonly signed: boolean
}
