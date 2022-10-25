import React, { useCallback } from 'react'
import { Dimensions, Image, View } from 'react-native'
import { detailsStyles } from '@/Containers/Private/Details/index.style'
import MyBtn from '@/Components/MyBtn'
import { homeStyles } from '@/Containers/Private/Home/Iindex.style'
import Carousel from 'react-native-reanimated-carousel'
import RenderHtml from 'react-native-render-html'
import { navigationRef } from '@/Navigators/utils'

export default function PycScreen(props) {
  const { gallery, text } = props?.route?.params
  const width = Dimensions.get('window').width
  const source = {
    html: `${text}`,
  }
  const goBack = useCallback(() => {
    navigationRef.goBack()
  }, [])

  return (
    <View style={detailsStyles.container}>
      <View style={detailsStyles.header}>
        <MyBtn
          btnStyle={homeStyles.btn}
          textStyle={homeStyles.btnText}
          containerStyle={{ width: '6%' }}
          text={'<'}
          onPress={goBack}
        />
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
                    borderWidth: 1,
                    justifyContent: 'center',
                    // backgroundColor: 'green',
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
            <RenderHtml contentWidth={width} source={source} />
          </View>
          <View />
        </View>
      </View>
    </View>
  )
}
