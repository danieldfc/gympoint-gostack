import { action } from 'typesafe-actions';

import { User, UserTypes } from './types';

export const updateProfileRequest = (data: User) =>
  action(UserTypes.UPDATE_PROFILE_REQUEST, { data });

export const updateProfileSuccess = (profile: User) =>
  action(UserTypes.UPDATE_PROFILE_SUCCESS, { profile });

export const updateProfileFailure = () =>
  action(UserTypes.UPDATE_PROFILE_FAILURE);
