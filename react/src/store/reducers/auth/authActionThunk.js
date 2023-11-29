/* eslint-disable no-unused-vars */
import { AuthService } from "../../../services/AuthService";
import  { loginStart } from "./authSlice";
import { loginSuccess } from "./authSlice";
import { loginFailure } from "./authSlice";


export const loginAsync = (email, password) => async (dispatch) => {
  try {
    dispatch(loginStart());
    const response = await AuthService.login(email , password);
    const { user, token } = response;

    dispatch(loginSuccess({ user, token }));
  } catch (error) {
    dispatch(loginFailure('Login failed. Please check your credentials.'));
    console.error('Login failed', error);
  }
};
