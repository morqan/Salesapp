import React, { useCallback, useEffect, useState } from 'react'
import { Image, Text, View } from 'react-native'
import SvgGenerator from '@/Components/SvgGenerator'
import { navigate, navigationRef } from "@/Navigators/utils"

export default function Floor(props) {
  console.log(props?.route?.params?.floor, 'props')
  const [widths, setWidths] = useState('')
  const [heights, setHeights] = useState('')
  const { img, plans } = props?.route?.params?.floor
  useEffect(() => {
    Image.getSize(img, (width, height) => {
      console.log(width, height, 'width, height')
      setHeights(height)
      setWidths(width)
    })
  }, [])
  const goBack = useCallback(() => {
    navigationRef.goBack()
  }, [])
  const onOpenPlan = useCallback(item => {
    console.log('test')
    navigate('Plan', { detail: item })
  }, [])
  return (
    <View>
      {widths && (
        <SvgGenerator
          img={img}
          path={plans?.data}
          onPress={onOpenPlan}
          width={widths}
          height={heights}
        />
      )}
    </View>
  )
}
