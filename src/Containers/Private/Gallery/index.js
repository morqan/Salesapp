import React, { useCallback } from 'react'
import { Dimensions, Image, View } from 'react-native'
import Carousel from 'react-native-reanimated-carousel'
import { planStyles } from '@/Containers/Private/Plan/index.style'
import MyBtn from '@/Components/MyBtn'
import { homeStyles } from '@/Containers/Private/Home/Iindex.style'
import { navigationRef } from "@/Navigators/utils"

export default function Gallery(props) {
  const { gallery } = props?.route?.params
  const width = Dimensions.get('window').width
  const goBack = useCallback(() => {
    navigationRef.goBack()
  }, [])
  return (
    <View style={{ backgroundColor: '#fff', paddingTop: 50 }}>
      <Carousel
        // loop
        width={width}
        autoPlay={false}
        data={gallery}
        scrollAnimationDuration={2000}
        // onSnapToItem={index => console.log('current index:', index)}
        renderItem={({ index, item }) => {
          return (
            <View style={planStyles.slideBox}>
              <Image
                style={planStyles.sliderImg}
                source={{
                  uri: `https://salesapp.portonovi.com/storage/app/media${item?.img}`,
                }}
              />
            </View>
          )
        }}
      />
      <View style={planStyles.backBtnBox}>
        <MyBtn
          btnStyle={homeStyles.btn}
          textStyle={homeStyles.btnText}
          containerStyle={{ width: '100%' }}
          text={'<'}
          onPress={goBack}
        />
      </View>
    </View>
  )
}
