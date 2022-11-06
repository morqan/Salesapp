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
    onSendMail: build.mutation({
      query: body => ({
        url: 'v1/data/send',
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
        url: 'v1/data/page',
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
  useOnSendMailMutation,
  useLazyGetPositionQuery,
  useLazyGetPagesQuery,
  useLazyGetImagesQuery,
} = authApi
