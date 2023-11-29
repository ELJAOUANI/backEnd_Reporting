import { createSlice } from '@reduxjs/toolkit';
import { storage } from './../../../utils/storage';
const initialState = {
  isAuthenticated: false,
  user: null,
  loading: false,
  error: null,
  token: storage.get('TOKEN') ?? null // Retrieve the token from local storage
 
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      const { user, token } = action.payload;
      state.isAuthenticated = true;
      state.user = user;
      state.token = token;
      state.loading = false;
      storage.set('TOKEN',token); // Save the token to local storage
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = '';
      storage.remove('TOKEN');
    },    
  },
});

export const { loginStart,logout, loginFailure,loginSuccess} = authSlice.actions;
export default authSlice.reducer;
