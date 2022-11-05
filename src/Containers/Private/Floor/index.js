import React, { useCallback, useEffect, useState } from 'react'
import { Image, View } from 'react-native'
import { navigate, navigationRef } from '@/Navigators/utils'
import { projectStyles } from '@/Containers/Private/Project/index.style'
import FloorSvgGenerator from '@/Components/FloorSvgGenerator'
import BackBtn from '@/Components/BackBtn'

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
  console.log(plans, 'plans')
  return (
    <View>
      <View style={projectStyles.absoluteHead}>
        <BackBtn onPress={goBack} />
      </View>
      {widths && (
        <FloorSvgGenerator
          img={img}
          path={plans?.data}
          onPress={onOpenPlan}
          width={widths}
          height={heights}
          top={0}
          backgroundColor={'#AC7D3A'}
        />
      )}
    </View>
  )
}
