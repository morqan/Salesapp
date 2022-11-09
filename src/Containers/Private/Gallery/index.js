import React, { useCallback, useEffect, useState } from 'react'
import { Dimensions, Image, View } from 'react-native'
import Carousel from 'react-native-reanimated-carousel'
import { planStyles } from '@/Containers/Private/Plan/index.style'
import { navigationRef } from '@/Navigators/utils'
import BackBtn from '@/Components/BackBtn'
import { useAuth } from '@/Hooks/useAuth'
import MainBtnGroup from '@/Components/MainBtnGroup'

export default function Gallery(props) {
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
    <View style={{ backgroundColor: '#fff', paddingTop: 50 }}>
      <Carousel
        // loop
        width={width}
        autoPlay={localImg?.length > 1}
        data={localImg}
        scrollAnimationDuration={5000}
        // onSnapToItem={index => console.log('current index:', index)}
        renderItem={({ index, item }) => {
          return (
            <View style={planStyles.slideBox}>
              <Image
                style={planStyles.sliderImg}
                source={{
                  uri: item?.localUrl,
                }}
              />
            </View>
          )
        }}
      />
      <View style={planStyles.backBtnBox}>
        <BackBtn onPress={goBack} />
      </View>
      <MainBtnGroup />
    </View>
  )
}
