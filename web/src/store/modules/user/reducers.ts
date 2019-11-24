import produce from 'immer';
import { Reducer } from 'redux';
import { UserState } from './types';

const INITIAL_STATE: UserState = {
  profile: null
};

const userReducer: Reducer<UserState> = (state = INITIAL_STATE, action) => {
  return produce(state, draft => {
    switch (action.type) {
      case '@auth/SIGN_IN_SUCCESS': {
        draft.profile = action.payload.user;
        break;
      }
      case '@user/UPDATE_PROFILE_SUCCESS': {
        draft.profile = action.payload.profile;
        break;
      }
      case '@auth/SIGN_OUT': {
        draft.profile = null;
        break;
      }
      default:
    }
  });
}

export default userReducer;
