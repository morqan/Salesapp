import { api } from '@/Services/api'

export const authApi = api.injectEndpoints({
  endpoints: build => ({
    onLogin: build.mutation({
      query: body => ({
        url: 'login',
        method: 'POST',
        body,
      }),
    }),
    getPosition: build.query({
      query: () => ({
        url: 'v1/data/projects',
      }),
    }),
    getPages: build.query({
      query: () => ({
        url: 'v1/data/page/index',
      }),
    }),
    getImages: build.query({
      query: () => ({
        url: '/v1/data/img',
      }),
    }),
  }),
})

export const {
  useOnLoginMutation,
  useLazyGetPositionQuery,
  useLazyGetPagesQuery,
  useLazyGetImagesQuery,
} = authApi
