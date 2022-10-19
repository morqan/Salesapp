import React, { useCallback, useEffect, useState } from 'react'
import { Dimensions, Image, View } from 'react-native'
import SvgGenerator from '@/Components/SvgGenerator'
import { navigate } from '@/Navigators/utils'

export default function Project(props) {
  const { width, height } = Dimensions.get('window')
  const [widths, setWidths] = useState('')
  const [heights, setHeights] = useState('')
  const { img, items } = props?.route?.params?.project
  console.log(props?.route?.params?.project, 'project')

  const onOpenDetails = useCallback(item => {
    console.log('test')
    navigate('Details', { detail: item })
  }, [])

  const image = {
    uri: `${img}`,
  }

  useEffect(() => {
    Image.getSize(img, (width, height) => {
      console.log(width, height, 'width, height')
      setHeights(height)
      setWidths(width)
    })
  }, [])
  return (
    <View style={{ flex: 1 }}>
      {widths && (
        <SvgGenerator
          img={img}
          path={items?.data}
          onPress={item => onOpenDetails(item)}
          width={widths}
          height={heights}
        />
      )}
    </View>
  )
}
