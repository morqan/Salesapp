import React from 'react'
import Svg, { G, Image, Path, Text, TSpan } from 'react-native-svg'
import { svgGeneratorStyles } from '@/Components/SvgGenerator/index.style'
import MyBtn from '@/Components/MyBtn'
import { Dimensions, View } from 'react-native'

export default function SvgGenerator({ img, path, items, onPress, width, height }) {
  const originalWidth = Number(width) * 8.5
  const originalHeight = Number(height) * 8.5
  const aspectRatio = originalWidth / originalHeight
  const windowWidth = Dimensions.get('window').width
  // const { width, height } = Dimensions.get('window')
  console.log(originalHeight, 'SvgGenerator height')
  console.log(originalWidth, 'SvgGenerator width')
  console.log(img, 'SvgGenerator width')
  return (
    <View style={{ width: windowWidth, aspectRatio, backgroundColor: 'red' }}>
      <Svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${originalWidth} ${originalHeight}`}
        xmlns="http://www.w3.org/2000/svg"
        xmlSpace="preserve"
        style={{ width: '100%', height: '100%' }}
        // viewBox="0 0 20970 7800"
        xmlnsXlink="http://www.w3.org/1999/xlink"
      >
        <G id="Layer_x0020_1">
          <Image width={originalWidth} height={originalHeight} xlinkHref={img} />
          {path &&
            path.map((item, index) => {
              return (
                <Path
                  key={index}
                  className="fil0"
                  style={svgGeneratorStyles.path}
                  onPress={() => onPress(item)}
                  d={`M${Number(item?.left)} ${Number(item?.top -2600)}h${item?.name.length * 130}v330H${Number(item?.left)}z`}
                  stroke="#AC7D3A"
                  strokeWidth={10.667}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              )
            })}
          {path &&
            path.map((item, index) => {
              return (
                <Text
                  key={index + 100}
                  fontSize={220}
                  // fontWeight="bold"
                  // letterSpacing={-0.2}
                  style={{ position: 'absolute' }}
                >
                  <TSpan
                    x={Number(item?.left) + 120}
                    y={Number(item?.top) - 2350}
                    fill="#000"
                  >
                    {item?.name}
                  </TSpan>
                </Text>
              )
            })}
          {items &&
            items.map((item, index) => {
              return (
                // <View pointerEvents="none" >
                <MyBtn
                  key={index}
                  containerStyle={{
                    position: 'absolute',
                    top: (height * Number(item?.top)) / 100,
                    left: (width * Number(item?.left)) / 100,
                    // width: 100,
                  }}
                  text={item?.name}
                />
                //   <Path
                //     key={item?.id}
                //     className="fil0"
                //     style={svgGeneratorStyles.pathBtn}
                //     onPress={() => onPress(item)}
                //     d="M2200 3400h1400v303H2200z"
                //     stroke="#AC7D3A"
                //     strokeWidth={10.667}
                //     strokeLinecap="round"
                //     strokeLinejoin="round"
                //   />
              )
            })}
        </G>
      </Svg>
    </View>
  )
}
