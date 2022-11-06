import React, { useCallback, useState } from 'react'
import { Dimensions, ScrollView, Text, View } from 'react-native'
import { infoStyles } from '@/Containers/Private/Information/index.style'
import RenderHtml from 'react-native-render-html'
import { planStyles } from '@/Containers/Private/Plan/index.style'
import { navigationRef } from '@/Navigators/utils'
import BackBtn from '@/Components/BackBtn'
import Footer from '@/Components/Footer'
import MainBtnGroup from '@/Components/MainBtnGroup'
import VideoModal from '@/Components/VideoModal'

export default function Information(props) {
  const [showVideo, setShowVideo] = useState(false)
  const { title, text, params } = props?.route?.params
  const { catalog, gallery, information, video, pyc, name, pyc_gallery, map } =
    params
  const width = Dimensions.get('window').width
  const source = {
    html: `${text}`,
  }
  const goBack = useCallback(() => {
    navigationRef.goBack()
  }, [])

  const videoModalHandler = useCallback(() => {
    setShowVideo(prevState => !prevState)
  }, [])

  console.log(props?.route?.params, 'props?.route?.params')
  return (
    <View style={infoStyles.container}>
      <Text style={infoStyles.title}>{title}</Text>
      <ScrollView style={{ flex: 1 }}>
        <RenderHtml
          contentWidth={width}
          source={source}
          tagsStyles={infoStyles.tagStyle}
        />
      </ScrollView>
      <View style={planStyles.backBtnBox}>
        <BackBtn onPress={goBack} />
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
      />
      <MainBtnGroup />
      {showVideo && (
        <VideoModal video={video} onPressClose={videoModalHandler} />
      )}
    </View>
  )
}
