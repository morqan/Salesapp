import React, { useCallback, useEffect, useState } from 'react'
import { Image, Text, View, useWindowDimensions } from 'react-native'
import { detailsStyles } from '@/Containers/Private/Details/index.style'
import Carousel from 'react-native-reanimated-carousel'
import MyBtn from '@/Components/MyBtn'
import { homeStyles } from '@/Containers/Private/Home/Iindex.style'
import { navigationRef } from '@/Navigators/utils'
import RenderHtml from 'react-native-render-html'
import { planStyles } from '@/Containers/Private/Plan/index.style'

export default function Plan(props) {
  const { width } = useWindowDimensions()
  const { gallery, name, info } = props?.route?.params?.plan
  const [headInfo, setHeadInfo] = useState([])
  const goBack = useCallback(() => {
    navigationRef.goBack()
  }, [])

  useEffect(() => {
    const infoHead = info.map(item => {
      return {
        html: `${item?.content}`,
      }
    })
    setHeadInfo(infoHead)
    console.log(infoHead, 'infohead')
  }, [])

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={planStyles.backBtnBox}>
        <MyBtn
          btnStyle={homeStyles.btn}
          textStyle={homeStyles.btnText}
          containerStyle={{ width: '100%' }}
          text={'<'}
          onPress={goBack}
        />
      </View>
      <View style={planStyles.header}>
        <View>
          <Text>{name}</Text>
        </View>
        {headInfo.map((item, index) => {
          return <RenderHtml key={index} contentWidth={width} source={item} />
        })}
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
                  // width: 500,
                  // height: 500,
                  justifyContent: 'center',
                  backgroundColor: 'red',
                  flex: 1,
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
