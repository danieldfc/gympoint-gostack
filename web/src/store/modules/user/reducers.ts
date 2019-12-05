import { Reducer } from 'redux';
import { UserState, UserTypes } from './types';
import { AuthTypes } from '../auth/types';

const INITIAL_STATE: UserState = {
  profile: null,
};

const userReducer: Reducer<UserState> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AuthTypes.SIGN_IN_SUCCESS:
      return { ...state, profile: action.user };
    case UserTypes.UPDATE_PROFILE_SUCCESS:
      return { ...state, profile: action.profile };
    case AuthTypes.SIGN_OUT:
      return { ...state, profile: null };
    default:
      return state;
  }
};

export default userReducer;
