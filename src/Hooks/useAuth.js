import {
  selectCurrentAccessToken,
  selectCurrentHomeItemPosition,
  selectCurrentUser,
} from '@/Store/Auth'
import { useMemo } from 'react'
import { useSelector } from 'react-redux'

export const useAuth = () => {
  const user = useSelector(selectCurrentUser)
  const token = useSelector(selectCurrentAccessToken)
  const homeItemPositions = useSelector(selectCurrentHomeItemPosition)

  return useMemo(
    () => ({
      user,
      token,
      homeItemPositions,
    }),
    [user, token, homeItemPositions],
  )
}
