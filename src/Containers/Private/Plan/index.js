import React from 'react'
import { Dimensions, Image, Text, View } from "react-native"
import { detailsStyles } from "@/Containers/Private/Details/index.style"
import Carousel from "react-native-reanimated-carousel"

export default function Plan(props) {

  const width = Dimensions.get('window').width
  const height = Dimensions.get('window').height
  const isPortrait = () => {
    const dim = Dimensions.get('screen')
    return dim.height >= dim.width
  }
  return (
    <View>
      <View>
        <Text>Plan Header</Text>
      </View>
      <View style={detailsStyles.sliderBox}>
        <Carousel
          loop
          width={isPortrait() ? height : width}
          height={height}
          autoPlay={true}
          data={[1,2,5,6]}
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
                {/*<Image*/}
                {/*  style={detailsStyles.sliderImg}*/}
                {/*  source={{*/}
                {/*    uri: `https://salesapp.portonovi.com/storage/app/media${item?.img}`,*/}
                {/*  }}*/}
                {/*/>*/}
              </View>
            )
          }}
        />
      </View>

    </View>
  )
}
