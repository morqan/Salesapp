import React, { useCallback } from 'react'
import { Dimensions, Image, Text, View } from 'react-native'
import MyBtn from '@/Components/MyBtn'
import { homeStyles } from '@/Containers/Private/Home/Iindex.style'
import { detailsStyles } from '@/Containers/Private/Details/index.style'
import Carousel from 'react-native-reanimated-carousel'
import { navigate, navigationRef } from '@/Navigators/utils'

export default function Details(props) {
  const { gallery, blocks, name } = props?.route?.params?.detail
  console.log(props?.route?.params?.detail, 'detail')
  const isPortrait = () => {
    const dim = Dimensions.get('screen')
    return dim.height >= dim.width
  }
  const width = Dimensions.get('window').width
  const height = Dimensions.get('window').height
  const goBack = useCallback(() => {
    navigationRef.goBack()
  }, [])

  const onOpenFloor = useCallback(item => {
    console.log('test')
    navigate('Floor', { floor: item })
  }, [])

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
            width={isPortrait() ? (width * 2) / 3.5 : (height * 2) / 3.5}
            height={height / 1.16}
            autoPlay={gallery.length > 1}
            data={gallery}
            scrollAnimationDuration={3000}
            onSnapToItem={index => console.log('current index:', index)}
            renderItem={({ index, item }) => {
              console.log(
                'https://salesapp.portonovi.com/storage/app/media' + item?.img,
                'item',
              )
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
            <Text style={detailsStyles.contentHeaderText}>FLOOR PLANS</Text>
            <Text style={detailsStyles.contentHeaderText}>WATCH VIDEO</Text>
          </View>
          <View style={detailsStyles.contentHeader}>
            {blocks?.data &&
              blocks?.data.map(item => {
                console.log(item, 'test')
                return item?.floors?.data.map(floor => {
                  console.log(floor, 'floor')
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
            <Text style={detailsStyles.contentText}>
              With expansive indoor-outdoor living space, including your own
              roof garden, pool terrace, private beachfront and jetty, Villa
              Orjen is the ideal home for gathering family and friends together.
              Three or four spacious king or twin rooms open onto private
              terraces or balconies with breathtaking views of Montenegro’s
              mountainous coastline. Inside, local heritage meets distinctive
              modern design accented with a rich use of colour and texture.
              Through floor-to-ceiling glass walls, your private outdoor
              playground beckons. Jump between your hydrotherapy swimming pool
              and private beach, and watch magical sunsets on the azure waters
              of the Adriatic Sea. Villa Orjen includes three or four bedrooms,
              accommodating
            </Text>
          </View>
          <View />
        </View>
      </View>
    </View>
  )
}
