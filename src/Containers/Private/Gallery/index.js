import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Dimensions, Image, Text, TouchableOpacity, View } from 'react-native'
import Carousel from 'react-native-reanimated-carousel'
import { planStyles } from '@/Containers/Private/Plan/index.style'
import { navigationRef } from '@/Navigators/utils'
import BackBtn from '@/Components/BackBtn'
import { useAuth } from '@/Hooks/useAuth'
import MainBtnGroup from '@/Components/MainBtnGroup'
import Pinchable from 'react-native-pinchable'
import SvgLeft from '@/Assets/SvgLeft'
import SvgRight from '@/Assets/SvgRight'

export default function Gallery(props) {
  const sliderRef = useRef()
  const [localImg, setLocalImg] = useState([])
  const { localImagesUrls } = useAuth()
  const { gallery } = props?.route?.params
  const width = Dimensions.get('window').width
  const goBack = useCallback(() => {
    navigationRef.goBack()
  }, [])
  useEffect(() => {
    const newGallery = gallery.map(item => {
      let newImg =
        `https://app-portonovi-test.gocreative.az/storage/app/media${item?.img}`.replaceAll(
          ' ',
          '%20',
        )
      return newImg
    })
    const localGallery = localImagesUrls.filter(i => newGallery.includes(i?.id))
    setLocalImg(localGallery)
  }, [])

  console.log(localImg, 'localImg')

  return (
    <View style={{ backgroundColor: '#fff', paddingTop: 50, flex: 1 }}>
      <Carousel
        ref={sliderRef}
        width={width}
        data={localImg}
        scrollAnimationDuration={3000}
        renderItem={({ index, item }) => {
          return (
            <View>
              <Pinchable style={planStyles.slideBox}>
                <Image
                  style={planStyles.sliderImg}
                  source={{
                    uri: item?.localUrl,
                  }}
                />
              </Pinchable>
            </View>
          )
        }}
      />
      <View style={planStyles.backBtnBox}>
        <BackBtn onPress={goBack} />
      </View>
      <TouchableOpacity
        style={{ position: 'absolute', top: '50%', left: 20 }}
        onPress={() => {
          sliderRef?.current?.prev()
        }}
      >
        <SvgLeft />
      </TouchableOpacity>
      <TouchableOpacity
        style={planStyles.rightBtn}
        onPress={() => {
          sliderRef?.current?.next()
        }}
      >
        <SvgRight />
      </TouchableOpacity>
      <MainBtnGroup />
    </View>
  )
}
