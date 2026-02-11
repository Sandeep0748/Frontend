import { createSlice } from '@reduxjs/toolkit';
import requestService from '@/services/requestService.js';

const initialState = {
  requests: [],
  request: null,
  loading: false,
  error: null,
};

const requestSlice = createSlice({
  name: 'requests',
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
  },
});

// Thunk actions
export const createRequest = (requestData) => async (dispatch) => {
  dispatch(requestSlice.actions.setLoading(true));
  try {
    const response = await requestService.createRequest(requestData);
    dispatch(requestSlice.actions.setLoading(false));
    return response;
  } catch (error) {
    dispatch(requestSlice.actions.setError(error.message || 'Failed to create request'));
    dispatch(requestSlice.actions.setLoading(false));
    throw error;
  }
};

export const getMyRequests = (filters = {}) => async (dispatch) => {
  dispatch(requestSlice.actions.setLoading(true));
  try {
    const response = await requestService.getMyRequests(filters);
    dispatch(requestSlice.actions.setLoading(false));
    return response;
  } catch (error) {
    dispatch(requestSlice.actions.setError(error.message || 'Failed to fetch requests'));
    dispatch(requestSlice.actions.setLoading(false));
    throw error;
  }
};

export const getRequestById = (id) => async (dispatch) => {
  dispatch(requestSlice.actions.setLoading(true));
  try {
    const response = await requestService.getRequestById(id);
    dispatch(requestSlice.actions.setLoading(false));
    return response;
  } catch (error) {
    dispatch(requestSlice.actions.setError(error.message || 'Failed to fetch request'));
    dispatch(requestSlice.actions.setLoading(false));
    throw error;
  }
};

export const updateRequestStatus = (id, status) => async (dispatch) => {
  dispatch(requestSlice.actions.setLoading(true));
  try {
    const response = await requestService.updateStatus(id, status);
    dispatch(requestSlice.actions.setLoading(false));
    return response;
  } catch (error) {
    dispatch(requestSlice.actions.setError(error.message || 'Failed to update request'));
    dispatch(requestSlice.actions.setLoading(false));
    throw error;
  }
};

export const cancelRequest = (id) => async (dispatch) => {
  dispatch(requestSlice.actions.setLoading(true));
  try {
    const response = await requestService.cancelRequest(id);
    dispatch(requestSlice.actions.setLoading(false));
    return response;
  } catch (error) {
    dispatch(requestSlice.actions.setError(error.message || 'Failed to cancel request'));
    dispatch(requestSlice.actions.setLoading(false));
    throw error;
  }
};

export const { setLoading, setError, clearError } = requestSlice.actions;
export default requestSlice.reducer;
