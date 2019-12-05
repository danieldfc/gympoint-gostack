import { action } from 'typesafe-actions';

import { User, UserTypes } from './types';

export const updateProfileRequest = ({
  name, email, password, oldPassword, confirmPassword,
}: User) => action(UserTypes.UPDATE_PROFILE_REQUEST, {
  name, email, password, oldPassword, confirmPassword,
});

export const updateProfileSuccess = (profile: User) => action(UserTypes.UPDATE_PROFILE_SUCCESS, { profile });

export const updateProfileFailure = () => action(UserTypes.UPDATE_PROFILE_FAILURE);
