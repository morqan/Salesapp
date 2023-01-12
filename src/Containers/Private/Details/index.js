import React, { useCallback, useEffect, useState, useRef } from 'react'
import {
  Dimensions,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import MyBtn from '@/Components/MyBtn'
import { detailsStyles } from '@/Containers/Private/Details/index.style'
import Carousel from 'react-native-reanimated-carousel'
import { navigate, navigationRef } from '@/Navigators/utils'
import RenderHtml from 'react-native-render-html'
import { useAuth } from '@/Hooks/useAuth'
import VideoModal from '@/Components/VideoModal'
import Pinchable from 'react-native-pinchable'
import MyHeader from '@/Components/MyHeader'
import LeftMenu from '@/Components/LeftMenu'

export default function Details(props) {
  const scrollRef = useRef()
  const { localImagesUrls } = useAuth()
  const [showVideo, setShowVideo] = useState(false)
  const [localImg, setLocalImg] = useState([])

  const { gallery, blocks, name, content, video, info, is_plan } =
    props?.route?.params?.detail
  const { width } = Dimensions.get('window')

  const goBack = useCallback(() => {
    navigationRef.goBack()
  }, [])

  const onOpenFloor = useCallback(item => {
    if (item?.is_plan) {
      console.log(item, 'item')
      navigate('Plan', { plan: item })
    } else {
      navigate('Floor', {
        floor: item,
        blocks: blocks,
        detail: props?.route?.params?.detail,
      })
    }
  }, [])

  const source = {
    html: is_plan
      ? `${info === null ? '' : info}`
      : `${content === null ? '' : content}`,
  }

  console.log(props?.route?.params?.detail, 'props?.route?.params?.details')

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

  const videoModalHandler = useCallback(() => {
    setShowVideo(prevState => !prevState)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      scrollRef?.current?.flashScrollIndicators()
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <View style={detailsStyles.container}>
      <MyHeader goBack={goBack} />
      <View style={detailsStyles.body}>
        <LeftMenu
          blocks={blocks}
          title={name}
          video={video}
          onPressVideo={videoModalHandler}
          onOpenFloor={onOpenFloor}
        />

        <View style={detailsStyles.sliderBox}>
          <Carousel
            loop={false}
            width={source?.html ? width / 2.3 : width * 0.8}
            data={localImg}
            scrollAnimationDuration={3000}
            renderItem={({ index, item }) => {
              return (
                <View style={{ flex: 1}}>
                  <Pinchable>
                    <Image
                      style={detailsStyles.sliderImg}
                      source={{
                        uri: item?.localUrl,
                      }}
                    />
                  </Pinchable>
                </View>
              )
            }}
          />
        </View>
        {/*{source?.html && (*/}
        {/*  <ScrollView style={{width:"30%",}} ref={scrollRef}>*/}
        {/*    <RenderHtml*/}
        {/*      contentWidth={width}*/}
        {/*      source={source}*/}
        {/*      tagsStyles={detailsStyles.tagsStyles}*/}
        {/*    />*/}
        {/*  </ScrollView>*/}
        {/*)}*/}
      </View>
      {showVideo && (
        <VideoModal video={video} onPressClose={videoModalHandler} />
      )}
    </View>
  )
}
