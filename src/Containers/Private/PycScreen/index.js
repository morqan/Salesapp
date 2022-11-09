import React, { useCallback, useEffect, useState } from 'react'
import { Dimensions, Image, Text, View } from 'react-native'
import { detailsStyles } from '@/Containers/Private/Details/index.style'
import Carousel from 'react-native-reanimated-carousel'
import RenderHtml from 'react-native-render-html'
import { navigationRef } from '@/Navigators/utils'
import BackBtn from '@/Components/BackBtn'
import { useAuth } from '@/Hooks/useAuth'

export default function PycScreen(props) {
  const { gallery, text } = props?.route?.params
  const width = Dimensions.get('window').width
  const { localImagesUrls } = useAuth()
  const [localImg, setLocalImg] = useState([])
  const source = {
    html: `${text}`,
  }
  const goBack = useCallback(() => {
    navigationRef.goBack()
  }, [])
  useEffect(() => {
    const newGallery = gallery.map(item => {
      console.log(item?.original, 'newGallery')
      let newImg = item?.original.replaceAll(' ', '%20')
      return newImg
    })
    const localGallery = localImagesUrls.filter(i => newGallery.includes(i?.id))
    setLocalImg(localGallery)
  }, [])
  return (
    <View style={detailsStyles.container}>
      <View style={detailsStyles.header}>
        <Text style={detailsStyles.headerTitle}>Portonovi Yacht Club</Text>
        <BackBtn onPress={goBack} />
      </View>
      <View style={detailsStyles.body}>
        <View style={detailsStyles.sliderBox}>
          <Carousel
            loop={localImg.length > 1}
            width={width / 2}
            autoPlay={localImg.length > 1}
            data={localImg}
            scrollAnimationDuration={5000}
            // onSnapToItem={index => console.log('current index:', index)}
            renderItem={({ index, item }) => {
              return (
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                  }}
                >
                  <Image
                    style={detailsStyles.sliderImg}
                    source={{
                      uri: item?.localUrl,
                    }}
                  />
                </View>
              )
            }}
          />
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
    </View>
  )
}
