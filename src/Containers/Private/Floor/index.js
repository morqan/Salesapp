import React, { useCallback, useEffect, useState } from 'react'
import { Image, View } from 'react-native'
import SvgGenerator from '@/Components/SvgGenerator'
import { navigate, navigationRef } from '@/Navigators/utils'
import { projectStyles } from '@/Containers/Private/Project/index.style'
import MyBtn from '@/Components/MyBtn'
import { homeStyles } from '@/Containers/Private/Home/Iindex.style'

export default function Floor(props) {
  const [widths, setWidths] = useState('')
  const [heights, setHeights] = useState('')
  const { img, plans } = props?.route?.params?.floor
  useEffect(() => {
    Image.getSize(img, (width, height) => {
      setHeights(height)
      setWidths(width)
    })
  }, [])
  const goBack = useCallback(() => {
    navigationRef.goBack()
  }, [])
  const onOpenPlan = useCallback(item => {
    navigate('Plan', { plan: item })
  }, [])
  return (
    <View>
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
          path={plans?.data}
          onPress={onOpenPlan}
          width={widths}
          height={heights}
          top={0}
        />
      )}
    </View>
  )
}
