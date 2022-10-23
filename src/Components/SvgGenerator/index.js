import React from 'react'
import Svg, { G, Image, Path, Text, TSpan } from 'react-native-svg'
import { svgGeneratorStyles } from '@/Components/SvgGenerator/index.style'
import MyBtn from '@/Components/MyBtn'
import { Dimensions, View } from 'react-native'

export default function SvgGenerator({
  img,
  path,
  onPress,
  width,
  height,
  top,
  backgroundColor,
}) {
  const originalWidth = Number(width) * 8.6
  const originalHeight = Number(height) * 8.6
  const aspectRatio = originalWidth / originalHeight
  const windowWidth = Dimensions.get('window').width

  return (
    <View style={{ width: windowWidth, aspectRatio }}>
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
          <Image
            width={originalWidth}
            height={originalHeight}
            xlinkHref={img}
          />
          {path &&
            path.map((item, index) => {
              return (
                <Path
                  key={index}
                  className="fil0"
                  style={[
                    svgGeneratorStyles.path,
                    backgroundColor && { fill: backgroundColor },
                  ]}
                  onPress={() => onPress(item)}
                  d={`M${Number(item?.left)} ${Number(item?.top - top)}h${
                    item?.name.length > 2
                      ? item?.name.length * 130
                      : item?.name.length * 220
                  }v330H${Number(item?.left)}z`}
                  stroke="#AC7D3A"
                  strokeWidth={10}
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
                  fontSize={210}
                  fontWeight="500"
                  // letterSpacing={-0.2}
                  style={{ position: 'absolute' }}
                >
                  <TSpan
                    x={Number(item?.left) + 120}
                    y={Number(item?.top) - top + 250}
                    fill={backgroundColor ? '#fff' : '#000'}
                  >
                    {item?.name}
                  </TSpan>
                </Text>
              )
            })}
        </G>
      </Svg>
    </View>
  )
}
