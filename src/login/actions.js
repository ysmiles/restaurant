import { SUBMIT_LOGIN, REGISTER_LOGIN } from "./actionTypes";

export const submitLogin = userinfo => ({
  type: SUBMIT_LOGIN,
  username: userinfo.username,
  password: userinfo.password
});

export const registerLogin = userinfo => ({
  type: REGISTER_LOGIN,
  username: userinfo.username,
  password: userinfo.password,
  firstname: userinfo.firstname,
  lastname: userinfo.lastname,
  email: userinfo.email
});
