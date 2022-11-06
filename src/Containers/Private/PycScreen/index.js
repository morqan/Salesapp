import React, { useCallback } from 'react'
import { Dimensions, Image, Text, View } from 'react-native'
import { detailsStyles } from '@/Containers/Private/Details/index.style'
import MyBtn from '@/Components/MyBtn'
import { homeStyles } from '@/Containers/Private/Home/Iindex.style'
import Carousel from 'react-native-reanimated-carousel'
import RenderHtml from 'react-native-render-html'
import { navigationRef } from '@/Navigators/utils'
import BackBtn from '@/Components/BackBtn'

export default function PycScreen(props) {
  const { gallery, text } = props?.route?.params
  const width = Dimensions.get('window').width
  const source = {
    html: `${text}`,
  }
  const goBack = useCallback(() => {
    navigationRef.goBack()
  }, [])
  console.log(props?.route?.params, 'props?.route?.params')
  return (
    <View style={detailsStyles.container}>
      <View style={detailsStyles.header}>
        <Text style={detailsStyles.headerTitle}>Portonovi Yacht Club</Text>
        <BackBtn onPress={goBack} />
      </View>
      <View style={detailsStyles.body}>
        <View style={detailsStyles.sliderBox}>
          <Carousel
            loop
            width={width / 2}
            autoPlay={gallery.length > 1}
            data={gallery}
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
                      uri: item?.original,
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
