import { Reducer } from 'redux';
import { AuthState, AuthTypes } from './types';

const INITIAL_STATE: AuthState = {
  token: null,
  loading: false,
  signed: false,
};

const authReducer: Reducer<AuthState> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AuthTypes.SIGN_IN_REQUEST:
      return { ...state, loading: true };
    case AuthTypes.SIGN_IN_SUCCESS:
      return {
        ...state, token: action.token, signed: true, loading: false,
      };
    case AuthTypes.SIGN_UP_REQUEST:
      return { ...state };
    case AuthTypes.SIGN_FAILURE:
      return { ...state, loading: false };
    case AuthTypes.SIGN_OUT:
      return { ...state, token: null, signed: false };
    default:
      return state;
  }
};

export default authReducer;
