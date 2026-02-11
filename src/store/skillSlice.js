import { createSlice } from '@reduxjs/toolkit';
import skillService from '@/services/skillService.js';

const initialState = {
  skills: [],
  skill: null,
  loading: false,
  error: null,
};

const skillSlice = createSlice({
  name: 'skills',
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
export const getAllSkills = (filters = {}) => async (dispatch) => {
  dispatch(skillSlice.actions.setLoading(true));
  try {
    const response = await skillService.getAllSkills(filters);
    dispatch(skillSlice.actions.setLoading(false));
    return response;
  } catch (error) {
    dispatch(skillSlice.actions.setError(error.message || 'Failed to fetch skills'));
    dispatch(skillSlice.actions.setLoading(false));
    throw error;
  }
};

export const searchSkills = (query) => async (dispatch) => {
  dispatch(skillSlice.actions.setLoading(true));
  try {
    const response = await skillService.searchSkills(query);
    dispatch(skillSlice.actions.setLoading(false));
    return response;
  } catch (error) {
    dispatch(skillSlice.actions.setError(error.message || 'Search failed'));
    dispatch(skillSlice.actions.setLoading(false));
    throw error;
  }
};

export const getSkillById = (id) => async (dispatch) => {
  dispatch(skillSlice.actions.setLoading(true));
  try {
    const response = await skillService.getSkillById(id);
    dispatch(skillSlice.actions.setLoading(false));
    return response;
  } catch (error) {
    dispatch(skillSlice.actions.setError(error.message || 'Failed to fetch skill'));
    dispatch(skillSlice.actions.setLoading(false));
    throw error;
  }
};

export const createSkill = (skillData) => async (dispatch) => {
  dispatch(skillSlice.actions.setLoading(true));
  try {
    const response = await skillService.createSkill(skillData);
    dispatch(skillSlice.actions.setLoading(false));
    return response;
  } catch (error) {
    dispatch(skillSlice.actions.setError(error.message || 'Failed to create skill'));
    dispatch(skillSlice.actions.setLoading(false));
    throw error;
  }
};

export const updateSkill = (id, skillData) => async (dispatch) => {
  dispatch(skillSlice.actions.setLoading(true));
  try {
    const response = await skillService.updateSkill(id, skillData);
    dispatch(skillSlice.actions.setLoading(false));
    return response;
  } catch (error) {
    dispatch(skillSlice.actions.setError(error.message || 'Failed to update skill'));
    dispatch(skillSlice.actions.setLoading(false));
    throw error;
  }
};

export const deleteSkill = (id) => async (dispatch) => {
  dispatch(skillSlice.actions.setLoading(true));
  try {
    const response = await skillService.deleteSkill(id);
    dispatch(skillSlice.actions.setLoading(false));
    return response;
  } catch (error) {
    dispatch(skillSlice.actions.setError(error.message || 'Failed to delete skill'));
    dispatch(skillSlice.actions.setLoading(false));
    throw error;
  }
};

export const getUserSkills = (userId) => async (dispatch) => {
  dispatch(skillSlice.actions.setLoading(true));
  try {
    const response = await skillService.getUserSkills(userId);
    dispatch(skillSlice.actions.setLoading(false));
    return response;
  } catch (error) {
    dispatch(skillSlice.actions.setError(error.message || 'Failed to fetch user skills'));
    dispatch(skillSlice.actions.setLoading(false));
    throw error;
  }
};

export const { setLoading, setError, clearError } = skillSlice.actions;
export default skillSlice.reducer;
