import {
  takeLatest, call, put, all,
} from 'redux-saga/effects';
import { toast } from 'react-toastify';

import history from '~/services/history';
import api from '~/services/api';

import { signInSuccess, signFailure } from './actions';
import { User } from '../user/types';
import { AuthTypes } from './types';

export function* signIn({ email, password }: User) {
  try {
    const response = yield call(api.post, 'sessions', {
      email,
      password,
    });

    const { token, user } = response.data;

    yield put(signInSuccess({ token, user }));

    history.push('/dashboard');
  } catch (err) {
    toast.error('Falha na autenticação, verifique seus dados.');
    yield put(signFailure());
  }
}

export function* signUp({ name, email, password }: User) {
  try {
    yield call(api.post, 'users', {
      name,
      email,
      password,
    });

    toast.success('User cadastrado com sucesso!');

    history.push('/');
  } catch (err) {
    toast.error('Error ao cadastrar user');
    yield put(signFailure());
  }
}

export function signOut(): void {
  history.push('/');
}

function setToken({ payload }: Record<string, any>) {
  if (!payload) return;

  const { token } = payload.auth;

  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  }
}

export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest(AuthTypes.SIGN_OUT, signOut),
]);
