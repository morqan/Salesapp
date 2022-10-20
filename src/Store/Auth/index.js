import { api } from '@/Services/api'

const { createSlice } = require('@reduxjs/toolkit')

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    accessToken: null,
    homeItemPosition: [],
  },
  reducers: {
    removeCredentials: state => {
      state.user = null
      state.accessToken = null
    },
    changeToken: (state, { payload: { token } }) => {
      if (typeof token !== 'undefined') {
        state.accessToken = token
      }
    },
    changeUser: (state, { payload: { token } }) => {
      if (typeof token !== 'undefined') {
        state.loginData = token
      }
    },
    setHomeItemPosition: (state, { payload: { itemPosition } }) => {
      if (typeof itemPosition !== 'undefined') {
        state.homeItemPosition = itemPosition
      }
    },
  },
  extraReducers: builder => {
    // builder.addMatcher(
    //   api.endpoints.login.matchFulfilled,
    //   (state, { payload }) => {
    //     // console.log(payload, 'pauload')
    //     state.loginData = payload.data
    //   },
    // )
  },
})

export const { removeCredentials, changeToken, changeUser, setHomeItemPosition } = authSlice.actions

export default authSlice.reducer

export const selectCurrentUser = state => state.auth.user
export const selectCurrentAccessToken = state => state.auth.accessToken
export const selectCurrentHomeItemPosition = state => state.auth.homeItemPosition
