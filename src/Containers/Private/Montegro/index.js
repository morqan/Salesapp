import React, { useCallback, useState, useEffect, useRef } from 'react'
import { Dimensions, Image, ScrollView, Text, View } from 'react-native'
import { detailsStyles } from '@/Containers/Private/Details/index.style'
import RenderHtml from 'react-native-render-html'
import { navigationRef } from '@/Navigators/utils'
import BackBtn from '@/Components/BackBtn'
import Footer from '@/Components/Footer'
import MainBtnGroup from '@/Components/MainBtnGroup'
import VideoModal from '@/Components/VideoModal'
import { useAuth } from '@/Hooks/useAuth'
import LeftMenu from '@/Components/LeftMenu'
import MyHeader from '@/Components/MyHeader'
import { Config } from '@/Config'

export default function Montegro(props) {
  const { params } = props?.route?.params
  const {
    catalog,
    gallery,
    information,
    video,
    pyc,
    name,
    pyc_gallery,
    map,
    left_img,
    content,
    header_title,
    location,
  } = params
  const width = Dimensions.get('window').width
  const [showVideo, setShowVideo] = useState(false)
  const { localImagesUrls } = useAuth()
  const [localImg, setLocalImg] = useState('')
  const scrollRef = useRef()

  useEffect(() => {
    console.log(left_img, 'newImg')

    let newImg = `${Config?.IMG_PATH}${left_img}`.replaceAll(' ', '%20')
    localImagesUrls.filter(x => {
      if (x?.id === newImg) {
        console.log(x, 'xxxs')
        setLocalImg(`${x?.localUrl}`)
      }
    })
  }, [])

  const source = {
    html: `${content}`,
  }
  const goBack = useCallback(() => {
    navigationRef.goBack()
  }, [])

  console.log(props?.route?.params, 'props?.route?.params')
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
          title={header_title}
          catalog={catalog}
          gallery={gallery}
          information={information || content}
          content={content}
          video={video}
          pyc={pyc}
          name={name}
          pyc_gallery={pyc_gallery}
          params={params}
          onPressVideo={videoModalHandler}
          map={map}
          location={location}
        />
        <View style={{ width: 400 }}>
          {localImg && (
            <Image
              style={detailsStyles.sliderImg}
              source={{
                uri: localImg,
              }}
            />
          )}
        </View>
        <ScrollView ref={scrollRef} style={detailsStyles.content}>
          <View>
            <RenderHtml
              contentWidth={width}
              source={source}
              tagsStyles={detailsStyles.tagsStylesMontenegro}
            />
          </View>
          <View />
        </ScrollView>
      </View>
      {showVideo && (
        <VideoModal video={video} onPressClose={videoModalHandler} />
      )}
    </View>
  )
}
