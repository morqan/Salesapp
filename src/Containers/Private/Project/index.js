import React, { useCallback, useEffect, useState } from 'react'
import { Dimensions, Image, View } from 'react-native'
import SvgGenerator from '@/Components/SvgGenerator'
import { navigate, navigationRef } from '@/Navigators/utils'
import { projectStyles } from '@/Containers/Private/Project/index.style'
import VideoModal from '@/Components/VideoModal'
import { useAuth } from '@/Hooks/useAuth'
import MyHeader from '@/Components/MyHeader'
import LeftMenu from '@/Components/LeftMenu'
import { detailsStyles } from '@/Containers/Private/Details/index.style'

export default function Project(props) {
  const width = Dimensions.get('window').width
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
    const newImg = img.replaceAll(' ', '%20')
    console.log(img, 'img')
    console.log(newImg, 'newImg')
    localImagesUrls.filter(x => {
      if (x?.id === newImg) {
        console.log(x, 'xxxs')
        Image.getSize(x?.localUrl, (width, height) => {
          setHeights(height)
          setWidths(width)
        })
      }
    })
    console.log(props?.route?.params?.project, 'props?.route?.params?.project')
  }, [])
  const goBack = useCallback(() => {
    navigationRef.goBack()
  }, [])

  return (
    <View style={projectStyles.container}>
      <MyHeader goBack={goBack} />
      {widths && (
        <View style={detailsStyles.body}>
          <LeftMenu
            title={name}
            catalog={catalog}
            gallery={gallery}
            information={information}
            video={video}
            pyc={pyc}
            name={name}
            pyc_gallery={pyc_gallery}
            params={props?.route?.params?.project}
            onPressVideo={videoModalHandler}
            path={items?.data}
            onOpenPlan={onOpenDetails}
          />
          <View style={[detailsStyles.sliderBox, { width: width * 0.74 }]}>
            <SvgGenerator
              img={img}
              path={items?.data}
              onPress={item => onOpenDetails(item)}
              width={widths}
              height={heights}
              top={1600}
              backgroundColor={'#0d6a78'}
              imgWidth={0.75}
            />
          </View>
        </View>
      )}
      {showVideo && (
        <VideoModal video={video} onPressClose={videoModalHandler} />
      )}
    </View>
  )
}
