import { createSlice } from '@reduxjs/toolkit'

const adminSlice = createSlice({
  name: 'admin',
  initialState: {
    adminName: null,
    error: null 
  },
  reducers: {
    adminLogin: (state, action) => {
      state.adminName = action.payload
      state.error = null 
    },
    adminLogout: (state) => {
      state.adminName = null
    },
    adminLoginFailure: (state, action) => {
      state.error = action.payload 
    },
    clearAdminError: (state) => {
        state.error = null 
      }
  }
})

export const { adminLogin, adminLogout, adminLoginFailure ,clearAdminError} = adminSlice.actions
export default adminSlice.reducer
