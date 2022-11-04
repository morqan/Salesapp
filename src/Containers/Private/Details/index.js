import React, { useCallback, useEffect, useState } from 'react'
import { Dimensions, Image, ScrollView, Text, View } from 'react-native'
import MyBtn from '@/Components/MyBtn'
import { detailsStyles } from '@/Containers/Private/Details/index.style'
import Carousel from 'react-native-reanimated-carousel'
import { navigate, navigationRef } from '@/Navigators/utils'
import RenderHtml from 'react-native-render-html'
import { useAuth } from '@/Hooks/useAuth'
import BackBtn from '@/Components/BackBtn'
import SvgVideoIcon from '@/Assets/SvgVideoIcon'

export default function Details(props) {
  const { gallery, blocks, name, content, video, info, is_plan } =
    props?.route?.params?.detail
  const { width } = Dimensions.get('window')
  const goBack = useCallback(() => {
    navigationRef.goBack()
  }, [])
  const { localImagesUrls } = useAuth()
  const [localImg, setLocalImg] = useState([])
  const onOpenFloor = useCallback(item => {
    if (item?.is_plan) {
      console.log(item, 'item')
      navigate('Plan', { plan: item })
    } else {
      navigate('Floor', { floor: item })
    }
  }, [])

  const source = {
    html: is_plan ? `${info}` : `${content}`,
  }
  console.log(props?.route?.params?.detail, 'props?.route?.params?.detail')
  useEffect(() => {
    const newGallery = gallery.map(item => {
      let newImg =
        `https://app-portonovi-test.gocreative.az/storage/app/media${item?.img}`.replaceAll(
          ' ',
          '%20',
        )
      return newImg
    })
    const localGallery = localImagesUrls.filter(i => newGallery.includes(i?.id))
    setLocalImg(localGallery)
  }, [])

  return (
    <View style={detailsStyles.container}>
      <View style={detailsStyles.header}>
        <Text style={detailsStyles.headerTitle}>{name}</Text>
        <BackBtn onPress={goBack} />
      </View>
      <View style={detailsStyles.body}>
        <View style={detailsStyles.sliderBox}>
          <Carousel
            loop
            width={width / 2}
            autoPlay={localImg.length > 1}
            data={localImg}
            scrollAnimationDuration={3000}
            // onSnapToItem={index => console.log('current index:', index)}
            renderItem={({ index, item }) => {
              return (
                <View
                  style={{
                    flex: 1,
                    // borderWidth: 1,
                    justifyContent: 'center',
                    // backgroundColor: 'green',
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
          <View style={detailsStyles.contentHeader}>
            {blocks?.data.length > 0 && (
              <Text style={detailsStyles.contentHeaderText}>FLOOR PLANS</Text>
            )}
            {video && (
              <View style={detailsStyles.videoBox}>
                <Text style={detailsStyles.contentHeaderText}>WATCH VIDEO</Text>
                <View style={detailsStyles.videoIconBox}>
                  <SvgVideoIcon />
                </View>
              </View>
            )}
          </View>
          <View style={detailsStyles.btnBox}>
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
          <ScrollView>
            <RenderHtml
              contentWidth={width}
              source={source}
              tagsStyles={detailsStyles.tagsStyles}
            />
          </ScrollView>
          <View />
        </View>
      </View>
    </View>
  )
}
