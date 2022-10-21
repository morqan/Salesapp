import React, { useCallback, useEffect, useState } from 'react'
import { Text, View, Image } from 'react-native'
import { homeStyles } from '@/Containers/Private/Home/Iindex.style'
import { navigate } from '@/Navigators/utils'
import {
  useLazyGetPagesQuery,
  useLazyGetPositionQuery,
} from '@/Services/modules/Auth'
import { useDispatch } from 'react-redux'
import { setHomeItemPosition } from '@/Store/Auth'
import { useAuth } from '@/Hooks/useAuth'
import Footer from '@/Components/Footer'
import SvgGenerator from '@/Components/SvgGenerator'

export default function Home() {
  const [widths, setWidths] = useState('')
  const [heights, setHeights] = useState('')

  const dispatch = useDispatch()
  const { homeItemPositions } = useAuth()

  const [getPosition, { data, isSuccess, isError, error }] =
    useLazyGetPositionQuery()

  const [
    getPage,
    { data: getPageData, isSuccess: getPageIsSuccess, isError: getPageIsError },
  ] = useLazyGetPagesQuery()
  const image = {
    uri: `https://salesapp.portonovi.com/storage/app/media/${getPageData?.data?.viewBag?.img}`,
  }

  useEffect(() => {
    getPosition()
    getPage()
  }, [])

  useEffect(() => {
    if (isSuccess) {
      dispatch(setHomeItemPosition({ itemPosition: data?.data }))
    }
    if (isError) {
      console.log(error, 'getPosition error')
    }
  }, [isSuccess, isError])

  useEffect(() => {
    if (getPageIsSuccess) {
      dispatch(setHomeItemPosition({ itemPosition: data?.data }))
      Image.getSize(image?.uri, (width, height) => {
        setHeights(height)
        setWidths(width)
      })
    }
    if (getPageIsError) {
      console.log(error, 'getPosition error')
    }
  }, [getPageIsSuccess, getPageIsError])

  const onOpenProject = useCallback(item => {
    navigate('Project', { project: item })
  }, [])

  return (
    <View style={homeStyles.container}>
      <View style={homeStyles.logoBox}>
        <Text style={homeStyles.logo}>PORTONOVI</Text>
      </View>
      {getPageIsSuccess && widths && (
        <SvgGenerator
          img={image}
          path={homeItemPositions}
          onPress={onOpenProject}
          height={heights}
          width={widths}
          top={2600}
        />
      )}
      <Footer />
    </View>
  )
}
