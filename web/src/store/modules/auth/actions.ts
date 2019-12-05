import { action } from 'typesafe-actions';
import { AuthTypes, Auth } from './types';

import { User } from '../user/types';

export const signInRequest = ({ email, password }: User) => action(AuthTypes.SIGN_IN_REQUEST, { email, password });

export const signInSuccess = ({ token, user }: Auth) => action(AuthTypes.SIGN_IN_SUCCESS, { token, user });

export const signFailure = () => action(AuthTypes.SIGN_FAILURE);

export const signUpRequest = ({ name, email, password }: User) => action(AuthTypes.SIGN_UP_REQUEST, { name, email, password });

export const signOut = () => action(AuthTypes.SIGN_OUT);
