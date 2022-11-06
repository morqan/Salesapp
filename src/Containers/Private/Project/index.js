import React, { useCallback, useEffect, useState } from 'react'
import { Image, View } from 'react-native'
import SvgGenerator from '@/Components/SvgGenerator'
import { navigate, navigationRef } from '@/Navigators/utils'
import { projectStyles } from '@/Containers/Private/Project/index.style'
import Footer from '@/Components/Footer'
import BackBtn from '@/Components/BackBtn'
import MainBtnGroup from '@/Components/MainBtnGroup'
import VideoModal from '@/Components/VideoModal'

export default function Project(props) {
  const [widths, setWidths] = useState('')
  const [heights, setHeights] = useState('')
  const [showVideo, setShowVideo] = useState(false)
  const {
    img,
    items,
    catalog,
    gallery,
    information,
    video,
    pyc,
    name,
    pyc_gallery,
  } = props?.route?.params?.project

  const onOpenDetails = useCallback(item => {
    navigate('Details', { detail: item })
  }, [])

  const videoModalHandler = useCallback(() => {
    setShowVideo(prevState => !prevState)
  }, [])

  useEffect(() => {
    Image.getSize(img, (width, height) => {
      setHeights(height)
      setWidths(width)
    })
    console.log(props?.route?.params?.project, 'props?.route?.params?.project')
  }, [])
  const goBack = useCallback(() => {
    navigationRef.goBack()
  }, [])

  return (
    <View style={projectStyles.container}>
      <View style={projectStyles.absoluteHead}>
        <BackBtn onPress={goBack} />
      </View>
      {widths && (
        <View style={{ paddingTop: 45 }}>
          <SvgGenerator
            img={img}
            path={items?.data}
            onPress={item => onOpenDetails(item)}
            width={widths}
            height={heights}
            top={1600}
            backgroundColor="#0d6a78"
          />
        </View>
      )}
      <Footer
        catalog={catalog}
        gallery={gallery}
        information={information}
        video={video}
        pyc={pyc}
        name={name}
        pyc_gallery={pyc_gallery}
        onPressVideo={videoModalHandler}
        params={props?.route?.params?.project}
      />
      <MainBtnGroup />
      {showVideo && (
        <VideoModal video={video} onPressClose={videoModalHandler} />
      )}
    </View>
  )
}
