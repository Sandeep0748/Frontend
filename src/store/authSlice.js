import { createSlice } from '@reduxjs/toolkit';
import authService from '@/services/authService.js';

const initialState = {
  user: null,
  token: localStorage.getItem('token') || null,
  loading: false,
  error: null,
  isAuthenticated: !!localStorage.getItem('token'),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem('token');
    },
  },
  extraReducers: {},
});

// Thunk actions
export const register = (userData) => async (dispatch) => {
  dispatch(authSlice.actions.setLoading(true));
  dispatch(authSlice.actions.clearError());
  try {
    const response = await authService.register(userData);
    if (response.token) {
      localStorage.setItem('token', response.token);
      dispatch(authSlice.actions.setUser(response.user || { email: response.email }));
      dispatch(authSlice.actions.setLoading(false));
    }
    return response;
  } catch (error) {
    console.error('Registration error:', error);
    const errorMessage = error.message || 'Registration failed';
    dispatch(authSlice.actions.setError(errorMessage));
    dispatch(authSlice.actions.setLoading(false));
    throw error;
  }
};

export const login = (email, password) => async (dispatch) => {
  dispatch(authSlice.actions.setLoading(true));
  dispatch(authSlice.actions.clearError());
  try {
    const response = await authService.login(email, password);
    if (response.token) {
      localStorage.setItem('token', response.token);
      dispatch(authSlice.actions.setUser(response.user || { email }));
      dispatch(authSlice.actions.setLoading(false));
    }
    return response;
  } catch (error) {
    console.error('Login error:', error);
    const errorMessage = error.message || 'Login failed';
    dispatch(authSlice.actions.setError(errorMessage));
    dispatch(authSlice.actions.setLoading(false));
    throw error;
  }
};

export const getProfile = () => async (dispatch) => {
  dispatch(authSlice.actions.setLoading(true));
  try {
    const response = await authService.getProfile();
    dispatch(authSlice.actions.setUser(response));
    dispatch(authSlice.actions.setLoading(false));
    return response;
  } catch (error) {
    const errorMessage = error.message || 'Failed to fetch profile';
    dispatch(authSlice.actions.setError(errorMessage));
    dispatch(authSlice.actions.setLoading(false));
    throw error;
  }
};

export const updateProfile = (data) => async (dispatch) => {
  dispatch(authSlice.actions.setLoading(true));
  try {
    const response = await authService.updateProfile(data);
    dispatch(authSlice.actions.setUser(response));
    dispatch(authSlice.actions.setLoading(false));
    return response;
  } catch (error) {
    const errorMessage = error.message || 'Failed to update profile';
    dispatch(authSlice.actions.setError(errorMessage));
    dispatch(authSlice.actions.setLoading(false));
    throw error;
  }
};

export const { setLoading, setError, clearError, setUser, logout } = authSlice.actions;
export default authSlice.reducer;
