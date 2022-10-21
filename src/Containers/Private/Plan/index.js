import React, { useCallback } from 'react'
import { Dimensions, Image, Text, View } from 'react-native'
import { detailsStyles } from '@/Containers/Private/Details/index.style'
import Carousel from 'react-native-reanimated-carousel'
import { projectStyles } from '@/Containers/Private/Project/index.style'
import MyBtn from '@/Components/MyBtn'
import { homeStyles } from '@/Containers/Private/Home/Iindex.style'
import { navigationRef } from '@/Navigators/utils'

export default function Plan(props) {
  const { gallery } = props?.route?.params?.plan
  const width = Dimensions.get('window').width
  const height = Dimensions.get('window').height
  const isPortrait = () => {
    const dim = Dimensions.get('screen')
    return dim.height >= dim.width
  }
  const goBack = useCallback(() => {
    navigationRef.goBack()
  }, [])
  console.log(props?.route?.params?.plan, 'plan')
  return (
    <View style={{ flex: 1 }}>
      <View style={projectStyles.projectHead}>
        <MyBtn
          btnStyle={homeStyles.btn}
          textStyle={homeStyles.btnText}
          containerStyle={{ width: '6%' }}
          text={'<'}
          onPress={goBack}
        />
      </View>
      <View>
        <Text>Plan Header</Text>
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
