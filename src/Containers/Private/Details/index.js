import React, { useCallback } from 'react'
import { Dimensions, Image, Text, View } from 'react-native'
import MyBtn from '@/Components/MyBtn'
import { homeStyles } from '@/Containers/Private/Home/Iindex.style'
import { detailsStyles } from '@/Containers/Private/Details/index.style'
import Carousel from 'react-native-reanimated-carousel'
import { navigate, navigationRef } from '@/Navigators/utils'
import RenderHtml from 'react-native-render-html'

export default function Details(props) {
  const { gallery, blocks, name, content, video } = props?.route?.params?.detail
  const width = Dimensions.get('window').width
  const goBack = useCallback(() => {
    navigationRef.goBack()
  }, [])

  const onOpenFloor = useCallback(item => {
    if (item?.is_plan) {
      console.log(item, 'item')
      navigate('Plan', { plan: item })
    } else {
      navigate('Floor', { floor: item })
    }
  }, [])

  const source = {
    html: `${content}`,
  }

  console.log(props?.route?.params?.detail, 'props?.route?.params?.detail')

  return (
    <View style={detailsStyles.container}>
      <View style={detailsStyles.header}>
        <Text style={detailsStyles.headerTitle}>{name}</Text>
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
                      uri: `https://salesapp.portonovi.com/storage/app/media${item?.img}`,
                    }}
                  />
                </View>
              )
            }}
          />
        </View>
        <View style={detailsStyles.content}>
          <View style={detailsStyles.contentHeader}>
            {blocks?.data.length > 0 && (
              <Text style={detailsStyles.contentHeaderText}>FLOOR PLANS</Text>
            )}
            {video && (
              <Text style={detailsStyles.contentHeaderText}>WATCH VIDEO</Text>
            )}
          </View>
          <View style={detailsStyles.contentHeader}>
            {blocks?.data &&
              blocks?.data.map(item => {
                return item?.floors?.data.map(floor => {
                  return (
                    <MyBtn
                      key={floor?.id}
                      textStyle={detailsStyles.typeBtnText}
                      containerStyle={detailsStyles.typeBtn}
                      text={floor?.name}
                      onPress={() => onOpenFloor(floor)}
                    />
                  )
                })
              })}
          </View>
          <View>
            <RenderHtml contentWidth={width} source={source} />
          </View>
          <View />
        </View>
      </View>
    </View>
  )
}
