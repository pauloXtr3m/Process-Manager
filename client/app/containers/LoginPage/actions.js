/*
 *
 * LoginPage actions
 *
 */

import {CHANGE_EMAIL, CHANGE_PASSWORD, LOGIN, AUTH_FAILED, REDIRECT, LOGIN_SUCCESS} from './constants';

export function changeEmail(email) {
  return {
    type: CHANGE_EMAIL,
    email,
  };
}

export function changePassword(password) {
  return {
    type: CHANGE_PASSWORD,
    password,
  };
}

export function login() {
  return {
    type: LOGIN,
  };
}

export function loginSuccess(userData) {
  return {
    type: LOGIN_SUCCESS,
    userData,
  };
}

export function authFailed(message){
  return {
    type: AUTH_FAILED,
    message,
  }
}

export function redirect(token){
  return {
    type: REDIRECT,
    token,
  }
}
