import React, { useEffect, useState, useCallback } from 'react'
import { Dimensions, Image, View } from 'react-native'
import { useAuth } from '@/Hooks/useAuth'
import { planStyles } from '@/Containers/Private/Plan/index.style'
import { navigationRef } from '@/Navigators/utils'
import portonoviGif from '@/Assets/Images/portonovi.gif'
import montonegroGif from '@/Assets/Images/montenegro-1.gif'
import MyHeader from '@/Components/MyHeader'
import { detailsStyles } from '@/Containers/Private/Details/index.style'
import LeftMenu from '@/Components/LeftMenu'

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
    content
  } = params
  const { localImagesUrls } = useAuth()
  const [localImg, setLocalImg] = useState('')
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
  }, [])

  const goBack = useCallback(() => {
    navigationRef.goBack()
  }, [])

  console.log(props?.route?.params, 'props?.route?.params')

  return (
    <View
      style={{
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: '#fff',
      }}
    >
      <MyHeader goBack={goBack} />
      <View style={detailsStyles.body}>
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
          // onPressVideo={videoModalHandler}
          map={map}
          location={location}
        />
        <View style={{ width: width - 300 }}>
          {localImg && (
            <Image source={{ uri: localImg }} style={planStyles.sliderImg} />
          )}
          {location && location === 'montenegro' && (
            <Image source={montonegroGif} style={planStyles.sliderImg} />
          )}
          {location && location === 'portonovi' && (
            <Image source={portonoviGif} style={planStyles.sliderImg} />
          )}
        </View>
      </View>
    </View>
  )
}
