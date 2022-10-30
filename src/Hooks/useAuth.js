import {
  selectCurrentAccessToken,
  selectCurrentHomeItemPosition,
  selectCurrentLocalImagesUrls,
  selectCurrentPages,
  selectCurrentUser,
} from '@/Store/Auth'
import { useMemo } from 'react'
import { useSelector } from 'react-redux'

export const useAuth = () => {
  const user = useSelector(selectCurrentUser)
  const token = useSelector(selectCurrentAccessToken)
  const homeItemPositions = useSelector(selectCurrentHomeItemPosition)
  const pages = useSelector(selectCurrentPages)
  const localImagesUrls = useSelector(selectCurrentLocalImagesUrls)

  return useMemo(
    () => ({
      user,
      token,
      homeItemPositions,
      pages,
      localImagesUrls,
    }),
    [user, token, homeItemPositions, pages, localImagesUrls],
  )
}
