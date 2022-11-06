import React, { useEffect, useState, useCallback } from 'react'
import { Image, View } from 'react-native'
import { useAuth } from '@/Hooks/useAuth'
import { planStyles } from '@/Containers/Private/Plan/index.style'
import BackBtn from '@/Components/BackBtn'
import { projectStyles } from '@/Containers/Private/Project/index.style'
import { navigationRef } from '@/Navigators/utils'

export default function MapScreen(props) {
  const { img } = props?.route?.params
  const { localImagesUrls } = useAuth()
  const [localImg, setLocalImg] = useState('')

  useEffect(() => {
    const newImg = img.replace(' ', '%20')
    localImagesUrls.filter(x => {
      if (x?.id === newImg) {
        console.log(x, 'MapScreen')
        setLocalImg(`${x?.localUrl}`)
      }
    })
  }, [])

  const goBack = useCallback(() => {
    navigationRef.goBack()
  }, [])

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
      }}
    >
      <View style={projectStyles.absoluteHead}>
        <BackBtn onPress={goBack} />
      </View>
      {localImg && (
        <Image source={{ uri: localImg }} style={planStyles.sliderImg} />
      )}
    </View>
  )
}
