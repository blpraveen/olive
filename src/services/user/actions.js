import { LOAD_USER,LOGIN,LOGOUT,UPDATE_USER,UPDATE_PROFILE_PICTURE } from './actionTypes';
export const loadUser = user => ({
  type: LOAD_USER,
  payload: {user}
});


export const updateProfileImage = user => ({
  type: UPDATE_PROFILE_PICTURE,
  payload: {user}
});


export const updateProfile = user => ({
  type: UPDATE_USER,
  payload: {user}
});


export const logout = user => ({
  type: LOGOUT,
  payload: {user}
});
export const loginInit = user => ({
  type: LOGIN,
  payload: {user}
});