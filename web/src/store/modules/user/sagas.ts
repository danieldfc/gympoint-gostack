import { all, call, put, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import { UserTypes } from './types';
import { updateProfileFailure, updateProfileSuccess } from './actions';

import api from '~/services/api';

export function* updateProfile({ payload }) {
  try {
    const { name, email, ...rest } = payload.data;

    const profile = {
      name,
      email,
      ...(rest.oldPassword ? rest : {}),
    };

    const respose = yield call(api.put, 'users', profile);

    yield put(updateProfileSuccess(respose.data));

    toast.success('Update profile with success!');
  } catch (err) {
    toast.error('Update profile failure, verify your data.');
    yield put(updateProfileFailure());
  }
}

export default all([
  takeLatest(UserTypes.UPDATE_PROFILE_REQUEST, updateProfile)
]);
