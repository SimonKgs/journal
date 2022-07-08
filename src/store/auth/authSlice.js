import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    status: 'cheking', //  'cheking',  'not-authenticated', 'authenticated'
    uid: null,
    email: null,
    displayName: null,
    photoURL: null,
    errorMessage: null
  },
  reducers: {
    login: (state, action) => {
      if (!action.payload.error) {
        state.status = 'authenticated',
          state.displayName = action.payload.displayName,
          state.email = action.payload.email,
          state.photoURL = action.payload.photoURL,
          state.uid = action.payload.uid
      } else {
        state.errorMessage = action.payload.errorMessage
        state.status = 'not-authenticated'
      }
    },
    logout: (state, { payload }) => {
      state.status = 'not-authenticated',
        state.uid = null,
        state.email = null,
        state.displayName = null,
        state.photoURL = null,
        state.errorMessage = payload?.errorMessage


      // state = { ...state, status: 'not-authenticated', errorMessage: payload.errorMessage }

    },
    checkingCredentials: (state) => {
      state.status = 'cheking'
    },
  },
});

// Action creators are generated for each case reducer function
export const { login, logout, checkingCredentials } = authSlice.actions