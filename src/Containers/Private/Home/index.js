import React, { useCallback, useEffect, useState } from 'react'
import { Dimensions, ImageBackground, Text, View, Image } from 'react-native'
import { homeStyles } from '@/Containers/Private/Home/Iindex.style'
import MyBtn from '@/Components/MyBtn'
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
        // console.log(width, height, 'width, height')
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

  // const { width, height } = Dimensions.get('window')

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
        />
      )}
      {/*<ImageBackground*/}
      {/*  resizeMode="cover"*/}
      {/*  source={image}*/}
      {/*  style={homeStyles.mapBox}*/}
      {/*>*/}
      {/*  {homeItemPositions &&*/}
      {/*    homeItemPositions.map(item => {*/}
      {/*      return (*/}
      {/*        <MyBtn*/}
      {/*          containerStyle={{*/}
      {/*            position: 'absolute',*/}
      {/*            top: (height * Number(item?.top)) / 100,*/}
      {/*            left: (width * Number(item?.left)) / 100,*/}
      {/*            // width: 100,*/}
      {/*          }}*/}
      {/*          key={item?.id}*/}
      {/*          text={item?.name}*/}
      {/*          onPress={() => onOpenProject(item)}*/}
      {/*          disabled={!Boolean(item?.is_active)}*/}
      {/*        />*/}
      {/*      )*/}
      {/*    })}*/}
      {/*</ImageBackground>*/}
      <Footer/>
    </View>
  )
}
