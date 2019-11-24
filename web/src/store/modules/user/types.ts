export enum UserTypes {
  UPDATE_PROFILE_REQUEST = '@user/UPDATE_PROFILE_REQUEST',
  UPDATE_PROFILE_SUCCESS = '@user/UPDATE_PROFILE_SUCCESS',
  UPDATE_PROFILE_FAILURE = '@user/UPDATE_PROFILE_FAILURE',
}

export interface User {
  id: number
  name: string
  email: string
  password: string
}

export interface UserState {
  readonly profile: User | null
}
