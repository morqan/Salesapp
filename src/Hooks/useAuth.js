import {
  selectCurrentAccessToken,
  selectCurrentDownloaded,
  selectCurrentHomeItemPosition,
  selectCurrentLocalImagesUrls,
  selectCurrentNeedReLogin,
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
  const downloaded = useSelector(selectCurrentDownloaded)
  const needReLogin = useSelector(selectCurrentNeedReLogin)

  return useMemo(
    () => ({
      user,
      token,
      homeItemPositions,
      pages,
      localImagesUrls,
      downloaded,
      needReLogin,
    }),
    [
      user,
      token,
      homeItemPositions,
      pages,
      localImagesUrls,
      downloaded,
      needReLogin,
    ],
  )
}
