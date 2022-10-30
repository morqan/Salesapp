import { api } from '@/Services/api'

const { createSlice } = require('@reduxjs/toolkit')

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    accessToken: null,
    homeItemPosition: [],
    pages: null,
    localImagesUrls: [],
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
    setPages: (state, { payload: { page } }) => {
      if (typeof page !== 'undefined') {
        state.pages = page
      }
    },
    setLocalImgUrls: (state, { payload: { localUrls } }) => {
      if (typeof localUrls !== 'undefined') {
        state.localImagesUrls = localUrls
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

export const {
  removeCredentials,
  changeToken,
  changeUser,
  setHomeItemPosition,
  setPages,
  setLocalImgUrls,
} = authSlice.actions

export default authSlice.reducer

export const selectCurrentUser = state => state.auth.user
export const selectCurrentAccessToken = state => state.auth.accessToken
export const selectCurrentHomeItemPosition = state =>
  state.auth.homeItemPosition
export const selectCurrentPages = state => state.auth.pages
export const selectCurrentLocalImagesUrls = state => state.auth.localImagesUrls
