import React, { useCallback } from 'react'
import { Image, Text, View, useWindowDimensions } from 'react-native'
import { detailsStyles } from '@/Containers/Private/Details/index.style'
import Carousel from 'react-native-reanimated-carousel'
import { projectStyles } from '@/Containers/Private/Project/index.style'
import MyBtn from '@/Components/MyBtn'
import { homeStyles } from '@/Containers/Private/Home/Iindex.style'
import { navigationRef } from '@/Navigators/utils'
import RenderHtml from 'react-native-render-html'

export default function Plan(props) {
  const { width } = useWindowDimensions()
  const { gallery } = props?.route?.params?.plan
  const goBack = useCallback(() => {
    navigationRef.goBack()
  }, [])
  console.log(props?.route?.params?.plan, 'plan')

  const source = {
    html: `
<p style='text-align:center;'>
  Hello World!
</p>`,
  }

  return (
    <View style={{ flex: 1, backgroundColor: 'red' }}>
      <View style={projectStyles.projectHead}>
        <MyBtn
          btnStyle={homeStyles.btn}
          textStyle={homeStyles.btnText}
          containerStyle={{ width: '6%' }}
          text={'<'}
          onPress={goBack}
        />
      </View>
      <View style={{ marginTop: -30, flexDirection:'row' }}>
        <RenderHtml contentWidth={width} source={source} />
        <RenderHtml contentWidth={width} source={source} />
      </View>
      <View>
        <Carousel
          // loop
          width={width}
          autoPlay={false}
          data={gallery}
          scrollAnimationDuration={3000}
          onSnapToItem={index => console.log('current index:', index)}
          renderItem={({ index, item }) => {
            return (
              <View
                style={{
                  alignItems: 'center',
                  width: '100%',
                  height: '100%',
                }}
              >
                <Image
                  style={detailsStyles.sliderImg}
                  source={{
                    uri: `https://salesapp.portonovi.com/storage/app/media${item?.img}`,
                  }}
                />
              </View>
            )
          }}
        />
      </View>
    </View>
  )
}
