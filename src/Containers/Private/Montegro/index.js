import React, { useCallback, useState, useEffect } from 'react'
import { Dimensions, Image, Text, View } from 'react-native'
import { detailsStyles } from '@/Containers/Private/Details/index.style'
import RenderHtml from 'react-native-render-html'
import { navigationRef } from '@/Navigators/utils'
import BackBtn from '@/Components/BackBtn'
import Footer from '@/Components/Footer'
import MainBtnGroup from '@/Components/MainBtnGroup'
import VideoModal from '@/Components/VideoModal'
import { useAuth } from '@/Hooks/useAuth'

export default function Montegro(props) {
  const { title, text, params, location } = props?.route?.params
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
  } = params
  const width = Dimensions.get('window').width
  const [showVideo, setShowVideo] = useState(false)
  const { localImagesUrls } = useAuth()
  const [localImg, setLocalImg] = useState('')

  useEffect(() => {
    console.log(left_img, 'newImg')

    let newImg =
      `https://app-portonovi-test.gocreative.az/storage/app/media${left_img}`.replaceAll(
        ' ',
        '%20',
      )
    console.log(newImg, 'newImg')
    localImagesUrls.filter(x => {
      if (x?.id === newImg) {
        console.log(x, 'xxxs')
        setLocalImg(`${x?.localUrl}`)
      }
    })
  }, [])

  const source = {
    html: `${text}`,
  }
  const goBack = useCallback(() => {
    navigationRef.goBack()
  }, [])
  console.log(props?.route?.params, 'props?.route?.params')
  const videoModalHandler = useCallback(() => {
    setShowVideo(prevState => !prevState)
  }, [])
  return (
    <View style={detailsStyles.container}>
      <View style={detailsStyles.header}>
        <Text style={detailsStyles.headerTitle}>{title}</Text>
        <BackBtn onPress={goBack} />
      </View>
      <View style={detailsStyles.body}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
          }}
        >
          {localImg && (
            <Image
              style={detailsStyles.sliderImg}
              source={{
                uri: localImg,
              }}
            />
          )}
        </View>
        <View style={detailsStyles.content}>
          <View>
            <RenderHtml
              contentWidth={width}
              source={source}
              tagsStyles={detailsStyles.tagsStyles}
            />
          </View>
          <View />
        </View>
      </View>
      <Footer
        catalog={catalog}
        gallery={gallery}
        information={information}
        video={video}
        pyc={pyc}
        name={name}
        pyc_gallery={pyc_gallery}
        params={params}
        onPressVideo={videoModalHandler}
        map={map}
        location={location}
      />
      <MainBtnGroup />
      {showVideo && (
        <VideoModal video={video} onPressClose={videoModalHandler} />
      )}
    </View>
  )
}
