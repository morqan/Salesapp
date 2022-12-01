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
import BackBtn from '@/Components/BackBtn'
import SvgVideoIcon from '@/Assets/SvgVideoIcon'
import VideoModal from '@/Components/VideoModal'
import MainBtnGroup from '@/Components/MainBtnGroup'
import Pinchable from 'react-native-pinchable'

export default function Details(props) {
  const scrollRef = useRef()

  const [showVideo, setShowVideo] = useState(false)
  const [localImg, setLocalImg] = useState([])

  const { gallery, blocks, name, content, video, info, is_plan } =
    props?.route?.params?.detail
  const { width } = Dimensions.get('window')

  const goBack = useCallback(() => {
    navigationRef.goBack()
  }, [])
  const { localImagesUrls } = useAuth()
  const onOpenFloor = useCallback(item => {
    if (item?.is_plan) {
      console.log(item, 'item')
      navigate('Plan', { plan: item })
    } else {
      navigate('Floor', { floor: item })
    }
  }, [])

  const source = {
    html: is_plan
      ? `${info === null ? '' : info}`
      : `${content === null ? '' : content}`,
  }
  console.log(props?.route?.params?.detail, 'props?.route?.params?.detail')
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
      <View style={detailsStyles.header}>
        <Text style={detailsStyles.headerTitle}>{name}</Text>
        <BackBtn onPress={goBack} />
      </View>
      <View style={detailsStyles.body}>
        <View style={detailsStyles.sliderBox}>
          <Carousel
            // loop
            width={width / 2}
            // autoPlay={localImg.length > 1}
            data={localImg}
            scrollAnimationDuration={5000}
            // onSnapToItem={index => console.log('current index:', index)}
            renderItem={({ index, item }) => {
              return (
                <View
                  style={{
                    flex: 1,
                    // borderWidth: 1,
                    justifyContent: 'center',
                    // backgroundColor: 'green',
                  }}
                >
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

        <View style={detailsStyles.content}>
          <View style={detailsStyles.contentHeader}>
            <View>
              {blocks?.data.length > 0 && (
                <Text style={detailsStyles.contentHeaderText}>FLOOR PLANS</Text>
              )}
            </View>
            {video && (
              <TouchableOpacity
                style={detailsStyles.videoBox}
                onPress={videoModalHandler}
              >
                <Text style={detailsStyles.contentHeaderText}>WATCH VIDEO</Text>
                <View style={detailsStyles.videoIconBox}>
                  <SvgVideoIcon />
                </View>
              </TouchableOpacity>
            )}
          </View>
          <View style={detailsStyles.btnBox}>
            {blocks?.data &&
              blocks?.data.map(item => {
                return item?.floors?.data.map(floor => {
                  return (
                    <MyBtn
                      key={floor?.id}
                      textStyle={detailsStyles.typeBtnText}
                      containerStyle={detailsStyles.typeBtn}
                      text={floor?.name}
                      onPress={() => onOpenFloor(floor)}
                    />
                  )
                })
              })}
          </View>
          <ScrollView ref={scrollRef}>
            <RenderHtml
              contentWidth={width}
              source={source}
              tagsStyles={detailsStyles.tagsStyles}
            />
          </ScrollView>
          <View />
        </View>
      </View>
      {showVideo && (
        <VideoModal video={video} onPressClose={videoModalHandler} />
      )}
      <MainBtnGroup />
    </View>
  )
}
