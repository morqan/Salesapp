import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Dimensions, ScrollView, Text, View } from 'react-native'
import { infoStyles } from '@/Containers/Private/Information/index.style'
import RenderHtml from 'react-native-render-html'
import { navigate, navigationRef } from '@/Navigators/utils'
import VideoModal from '@/Components/VideoModal'
import MyHeader from '@/Components/MyHeader'
import LeftMenu from '@/Components/LeftMenu'

export default function Information(props) {
  const scrollRef = useRef()
  const [showVideo, setShowVideo] = useState(false)
  const { title, text, params } = props?.route?.params
  const {
    catalog,
    gallery,
    information,
    video,
    pyc,
    pyc_gallery,
    map,
    items,
    content,
    header_title,
    location,
  } = params
  const width = Dimensions.get('window').width
  const source = {
    html: `${text || content}`,
  }
  const goBack = useCallback(() => {
    navigationRef.goBack()
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

  const onOpenDetails = useCallback(item => {
    navigate('Details', { detail: item })
  }, [])
  console.log(params, 'informations')
  return (
    <View style={infoStyles.container}>
      <MyHeader goBack={goBack} />
      <View style={{ flexDirection: 'row' }}>
        <LeftMenu
          catalog={catalog}
          gallery={gallery}
          information={information || content}
          video={video}
          pyc={pyc}
          title={title || header_title}
          pyc_gallery={pyc_gallery}
          params={params}
          onPressVideo={videoModalHandler}
          map={map}
          location={location}
          path={items?.data}
          onOpenPlan={onOpenDetails}
          name={title}
        />
        <ScrollView
          style={{ paddingHorizontal: 15, width: width * 0.74, backgroundColor: '#f8f8f8', }}
          showsVerticalScrollIndicator={true}
          ref={scrollRef}
        >
          <RenderHtml
            contentWidth={width}
            source={source}
            tagsStyles={infoStyles.tagStyle}
          />
        </ScrollView>
      </View>
      {showVideo && (
        <VideoModal video={video} onPressClose={videoModalHandler} />
      )}
    </View>
  )
}
