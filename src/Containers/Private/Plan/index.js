import React, { useCallback, useEffect, useState } from 'react'
import {
  Image,
  Text,
  View,
  useWindowDimensions,
  TouchableOpacity,
} from 'react-native'
import Carousel from 'react-native-reanimated-carousel'
import { navigationRef } from '@/Navigators/utils'
import RenderHtml from 'react-native-render-html'
import { planStyles } from '@/Containers/Private/Plan/index.style'
import { useAuth } from '@/Hooks/useAuth'
import BackBtn from '@/Components/BackBtn'
import letterImg from '../../../Assets/Images/mail.png'

export default function Plan(props) {
  const { width } = useWindowDimensions()
  const { localImagesUrls } = useAuth()
  const { gallery, name, info, is_reserved, is_sold } =
    props?.route?.params?.plan
  const [headInfo, setHeadInfo] = useState([])
  const [localImgs, setLocalImgs] = useState([])

  const goBack = useCallback(() => {
    navigationRef.goBack()
  }, [])

  useEffect(() => {
    const infoHead = info.map(item => {
      return {
        html: `${item?.content}`,
      }
    })
    setHeadInfo(infoHead)
    console.log(infoHead, 'infoHead')
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

    setLocalImgs(localGallery)
  }, [])
  console.log(localImgs, 'localImgs')
  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={planStyles.backBtnBox}>
        <BackBtn onPress={goBack} />
        <TouchableOpacity>
          <Image source={letterImg} style={{ width: 30,
            height: 30, }} />
        </TouchableOpacity>
      </View>
      <View style={planStyles.header}>
        <View>
          <Text>{name}</Text>
        </View>
        {headInfo.map((item, index) => {
          return <RenderHtml key={index} contentWidth={width} source={item} />
        })}
      </View>
      <View style={{ height: '80%' }}>
        <Carousel
          // loop
          width={width}
          autoPlay={false}
          data={localImgs}
          scrollAnimationDuration={3000}
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
      </View>
      {is_reserved !== 0 ||
        (is_sold !== 0 && (
          <View style={planStyles.sliderAbsoluteBox}>
            <Text style={planStyles.sliderAbsoluteText}>
              {is_sold !== 0 && 'Sold out'}
              {is_reserved !== 0 && 'Reserved'}
            </Text>
          </View>
        ))}
    </View>
  )
}
