import React, { useCallback, useEffect, useState } from 'react'
import { Image, View } from 'react-native'
import SvgGenerator from '@/Components/SvgGenerator'
import { navigate, navigationRef } from '@/Navigators/utils'
import { projectStyles } from '@/Containers/Private/Project/index.style'
import Footer from '@/Components/Footer'
import BackBtn from '@/Components/BackBtn'
import MainBtnGroup from '@/Components/MainBtnGroup'
import VideoModal from '@/Components/VideoModal'
import { useAuth } from '@/Hooks/useAuth'

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
  const { localImagesUrls } = useAuth()

  const onOpenDetails = useCallback(item => {
    navigate('Details', { detail: item })
  }, [])

  const videoModalHandler = useCallback(() => {
    setShowVideo(prevState => !prevState)
  }, [])

  useEffect(() => {
    const newImg = img.replace(' ', '%20')
    localImagesUrls.filter(x => {
      if (x?.id === newImg) {
        console.log(x, 'xxxs')
        // setLocalImg(`${x?.localUrl}`)
        Image.getSize(x?.localUrl, (width, height) => {
          console.log(height, 'localimgHeite')
          console.log(width, 'localimgwidth')
          setHeights(height)
          setWidths(width)
        })
      }
    })
    // Image.getSize(img, (width, height) => {
    //   setHeights(height)
    //   setWidths(width)
    // })
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
      <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}>
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
      </View>
      <MainBtnGroup />
      {showVideo && (
        <VideoModal video={video} onPressClose={videoModalHandler} />
      )}
    </View>
  )
}
