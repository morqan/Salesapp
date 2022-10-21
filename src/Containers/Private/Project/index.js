import React, { useCallback, useEffect, useState } from 'react'
import { Image, View } from 'react-native'
import SvgGenerator from '@/Components/SvgGenerator'
import { navigate, navigationRef } from '@/Navigators/utils'
import MyBtn from '@/Components/MyBtn'
import { homeStyles } from '@/Containers/Private/Home/Iindex.style'
import { projectStyles } from '@/Containers/Private/Project/index.style'

export default function Project(props) {
  const [widths, setWidths] = useState('')
  const [heights, setHeights] = useState('')
  const { img, items } = props?.route?.params?.project

  const onOpenDetails = useCallback(item => {
    navigate('Details', { detail: item })
  }, [])

  useEffect(() => {
    Image.getSize(img, (width, height) => {
      setHeights(height)
      setWidths(width)
    })
  }, [])
  const goBack = useCallback(() => {
    navigationRef.goBack()
  }, [])
  return (
    <View style={{ flex: 1, paddingRight: 20 }}>
      <View style={projectStyles.projectHead}>
        <MyBtn
          btnStyle={homeStyles.btn}
          textStyle={homeStyles.btnText}
          containerStyle={{ width: '6%' }}
          text={'<'}
          onPress={goBack}
        />
      </View>
      {widths && (
        <SvgGenerator
          img={img}
          path={items?.data}
          onPress={item => onOpenDetails(item)}
          width={widths}
          height={heights}
          top={1600}
          backgroundColor="#0d6a78"
        />
      )}
    </View>
  )
}
