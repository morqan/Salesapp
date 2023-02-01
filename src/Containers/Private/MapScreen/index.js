import React, { useEffect, useState, useCallback } from 'react'
import { Dimensions, Image, View } from 'react-native'
import { useAuth } from '@/Hooks/useAuth'
import { planStyles } from '@/Containers/Private/Plan/index.style'
import { navigationRef } from '@/Navigators/utils'
import portonoviGif from '@/Assets/Images/portonovi.gif'
import montonegroGif from '@/Assets/Images/montenegro-1.gif'
import MyHeader from '@/Components/MyHeader'
import LeftMenu from '@/Components/LeftMenu'
import Pinchable from 'react-native-pinchable'
import VideoModal from "@/Components/VideoModal"

export default function MapScreen(props) {
  const { img, params } = props?.route?.params
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
    header_title,
    location,
    content,
  } = params
  const { localImagesUrls } = useAuth()
  const [localImg, setLocalImg] = useState('')
  const [showVideo, setShowVideo] = useState(false)

  const width = Dimensions.get('window').width

  useEffect(() => {
    if (img) {
      const newImg = img.replace(' ', '%20')
      localImagesUrls.filter(x => {
        if (x?.id === newImg) {
          console.log(x, 'MapScreen')
          setLocalImg(`${x?.localUrl}`)
        }
      })
    }
  }, [location, header_title])

  const goBack = useCallback(() => {
    navigationRef.goBack()
  }, [])

  console.log(props?.route?.params, 'props?.route?.paramss')
  const videoModalHandler = useCallback(() => {
    setShowVideo(prevState => !prevState)
  }, [])
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
      }}
    >
      <MyHeader goBack={goBack} />
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <LeftMenu
          title={header_title}
          catalog={catalog}
          gallery={gallery}
          information={information || content}
          video={video}
          pyc={pyc}
          name={name}
          pyc_gallery={pyc_gallery}
          params={params}
          onPressVideo={videoModalHandler}
          map={map}
          location={location}
        />
        <View style={{ width: width * 0.75 }}>
          {localImg && header_title === 'LIFESTYLE' && (
            <Pinchable style={planStyles.slideBox}>
              <Image source={{ uri: localImg }} style={planStyles.mapImg} />
            </Pinchable>
          )}
          {location && location === 'montenegro' && (
            <Image source={montonegroGif} style={planStyles.mapImg} />
          )}
          {location && location === 'portonovi' && (
            <Image source={portonoviGif} style={planStyles.mapImg} />
          )}
        </View>
      </View>
      {showVideo && (
        <VideoModal video={video} onPressClose={videoModalHandler} />
      )}
    </View>
  )
}
