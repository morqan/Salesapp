import React, { useCallback, useEffect, useState } from 'react'
import { Image, View } from 'react-native'
import {
  navigate,
  navigateAndSimpleReset,
  navigationRef,
} from '@/Navigators/utils'
import FloorSvgGenerator from '@/Components/FloorSvgGenerator'
import { useAuth } from '@/Hooks/useAuth'
import MyHeader from '@/Components/MyHeader'
import LeftMenu from '@/Components/LeftMenu'
import { detailsStyles } from '@/Containers/Private/Details/index.style'

export default function Floor(props) {
  const { localImagesUrls } = useAuth()
  const { img, plans, name } = props?.route?.params?.floor
  const { blocks, detail } = props?.route?.params
  const [widths, setWidths] = useState('')
  const [heights, setHeights] = useState('')

  useEffect(() => {
    const newImg = img.replace(' ', '%20')
    localImagesUrls.filter(x => {
      if (x?.id === newImg) {
        Image.getSize(x?.localUrl, (width, height) => {
          setHeights(height)
          setWidths(width)
        })
      }
    })
  }, [img])

  const goBack = useCallback(item => {
    console.log(item, 'goBack')
    // navigateAndSimpleReset('Details', { detail: detail })

    navigationRef.goBack()
  }, [])

  const onOpenPlan = useCallback(item => {
    navigate('Plan', { plan: item })
  }, [])

  const onOpenFloor = useCallback(item => {
    console.log(item, 'item')
    console.log(img, 'img')

    if (item?.is_plan) {
      console.log(item, 'item')
      navigate('Plan', { plan: item })
    } else {
      navigateAndSimpleReset('Floor', {
        floor: item,
        blocks: blocks,
        detail: detail,
      })
    }
  }, [])

  console.log(props, 'props')
  return (
    <View style={{ flex: 1 }}>
      <MyHeader goBack={goBack} />
      <View style={detailsStyles.body}>
        {/*<LeftMenu*/}
        {/*  // blocks={blocks}*/}
        {/*  // onOpenFloor={onOpenFloor}*/}
        {/*  path={plans?.data}*/}
        {/*  onOpenPlan={onOpenPlan}*/}
        {/*  title={name}*/}
        {/*/>*/}
        <View style={detailsStyles.sliderBox}>
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
      </View>
    </View>
  )
}
