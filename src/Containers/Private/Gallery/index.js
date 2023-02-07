import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Dimensions, Image, TouchableOpacity, View } from 'react-native'
import Carousel from 'react-native-reanimated-carousel'
import { planStyles } from '@/Containers/Private/Plan/index.style'
import { navigate, navigationRef } from '@/Navigators/utils'
import { useAuth } from '@/Hooks/useAuth'
import Pinchable from 'react-native-pinchable'
import SvgLeft from '@/Assets/SvgLeft'
import SvgRight from '@/Assets/SvgRight'
import MyHeader from '@/Components/MyHeader'
import LeftMenu from '@/Components/LeftMenu'
import { detailsStyles } from '@/Containers/Private/Details/index.style'
import VideoModal from '@/Components/VideoModal'
import { Config } from '@/Config'

export default function Gallery(props) {
  const sliderRef = useRef()
  const [localImg, setLocalImg] = useState([])
  const [showVideo, setShowVideo] = useState(false)
  const { localImagesUrls } = useAuth()
  const { params } = props?.route?.params
  const {
    items,
    catalog,
    information,
    video,
    pyc,
    name,
    pyc_gallery,
    location,
    header_title,
    content,
    gallery,
    map,
  } = params
  const width = Dimensions.get('window').width
  const height = Dimensions.get('window').height
  const goBack = useCallback(() => {
    navigationRef.goBack()
  }, [])
  useEffect(() => {
    const newGallery = gallery?.map(item => {
      let newImg = `${Config.IMG_PATH}${item?.img}`.replaceAll(' ', '%20')
      return newImg
    })
    const localGallery = localImagesUrls.filter(i => newGallery.includes(i?.id))
    setLocalImg(localGallery)
  }, [])

  const onOpenDetails = useCallback(item => {
    navigate('Details', { detail: item })
  }, [])

  const videoModalHandler = useCallback(() => {
    setShowVideo(prevState => !prevState)
  }, [])

  console.log(props?.route, 'props?.route?g gallery')

  return (
    <View style={{ flex: 1 }}>
      <MyHeader goBack={goBack} headerTitle={header_title} />
      <View style={{ height: '90%', flexDirection: 'row' }}>
        <LeftMenu
          title={name || header_title}
          catalog={catalog}
          gallery={gallery}
          information={information || content}
          video={video}
          pyc={pyc}
          name={name}
          pyc_gallery={pyc_gallery}
          params={params}
          onPressVideo={videoModalHandler}
          path={items?.data}
          onOpenPlan={onOpenDetails}
          location={location}
          map={map}
        />
        <View style={detailsStyles.sliderBox}>
          <Carousel
            ref={sliderRef}
            width={width * 0.75}
            // height={800}
            data={localImg}
            scrollAnimationDuration={1000}
            renderItem={({ index, item }) => {
              return (
                <View>
                  <Pinchable style={planStyles.slideBoxGallery}>
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
        </View>
      </View>
      {showVideo && (
        <VideoModal video={video} onPressClose={videoModalHandler} />
      )}
    </View>
  )
}
