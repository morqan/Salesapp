import React, { useCallback, useEffect, useState } from 'react'
import { Dimensions, Image, View } from 'react-native'
import { detailsStyles } from '@/Containers/Private/Details/index.style'
import Carousel from 'react-native-reanimated-carousel'
import RenderHtml, { defaultSystemFonts } from 'react-native-render-html'
import { navigationRef } from '@/Navigators/utils'
import { useAuth } from '@/Hooks/useAuth'
import MyHeader from '@/Components/MyHeader'
import LeftMenu from '@/Components/LeftMenu'
import VideoModal from "@/Components/VideoModal"

export default function PycScreen(props) {
  const systemFonts = [...defaultSystemFonts, 'GothamPro', 'NoeDisplay-Medium']
  const { gallery, text, params } = props?.route?.params
  const { information, video, pyc, name, pyc_gallery } = params
  const [showVideo, setShowVideo] = useState(false)
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

  const videoModalHandler = useCallback(() => {
    setShowVideo(prevState => !prevState)
  }, [])

  console.log(params, 'paramss')
  return (
    <View style={detailsStyles.container}>
      <MyHeader goBack={goBack} />

      <View style={detailsStyles.body}>
        <LeftMenu
          gallery={pyc_gallery}
          information={information}
          video={video}
          pyc={pyc}
          params={params}
          title={'PORTONOVI YACHT CLUB'}
          name={name}
          onPressVideo={videoModalHandler}
        />
        <View style={detailsStyles.sliderBox}>
          <Carousel
            loop={false}
            // width={width / 2}
            width={source?.html ? width / 2.2 : width * 0.75}
            data={localImg}
            scrollAnimationDuration={3000}
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
        <View style={[detailsStyles.content, { width: '31%' }]}>
          <View>
            <RenderHtml
              contentWidth={width}
              source={source}
              tagsStyles={detailsStyles.tagsStylesPyc}
              systemFonts={systemFonts}
            />
          </View>
          <View />
        </View>
      </View>
      {showVideo && (
        <VideoModal video={video} onPressClose={videoModalHandler} />
      )}
    </View>
  )
}
