import React, { useEffect, useState } from 'react'
import Svg, {
  G,
  Path,
  Text,
  TSpan,
  Image,
  Circle,
  Rect,
} from 'react-native-svg'
import { svgGeneratorStyles } from '@/Components/SvgGenerator/index.style'
import { Dimensions, View } from 'react-native'
import { useAuth } from '@/Hooks/useAuth'

export default function SvgGenerator({
  img,
  path,
  onPress,
  width,
  height,
  top,
  backgroundColor,
  imgWidth,
}) {
  const originalWidth = Number(width) * 8.6
  const originalHeight = Number(height) * 8.6
  const aspectRatio = originalWidth / originalHeight
  const windowWidth = imgWidth
    ? Dimensions.get('window').width * imgWidth
    : Dimensions.get('window').width
  const { localImagesUrls } = useAuth()
  const [localImg, setLocalImg] = useState('')

  useEffect(() => {
    const newImg = img.replaceAll(' ', '%20')
    localImagesUrls.filter(x => {
      if (x?.id === newImg) {
        setLocalImg(`${x?.localUrl}`)
      }
    })
  }, [])
  // console.log(localImagesUrls, 'localImagesUrlslocalImagesUrls')
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
        preserveAspectRatio="none"
      >
        <G id="Layer_x0020_1">
          {localImg && (
            <Image
              width={originalWidth}
              height={originalHeight}
              xlinkHref={localImg}
              // href={localImg}
            />
          )}
          {/*{path &&*/}
          {/*  path.map((item, index) => {*/}
          {/*    return (*/}
          {/*      <G key={index} strokeWidth={2} stroke="#789" stroke-width="30">*/}
          {/*        <Path*/}
          {/*          className="fil0"*/}
          {/*          style={[*/}
          {/*            svgGeneratorStyles.path,*/}
          {/*            backgroundColor && { fill: item?.color },*/}
          {/*            item?.is_active === 0 && { opacity: 0.5, zIndex:99999 },*/}
          {/*          ]}*/}
          {/*          onPress={() => (item?.is_active === 1 ? onPress(item) : {})}*/}
          {/*          d={`M${Number(item?.left)} ${Number(*/}
          {/*            item?.top - top,*/}
          {/*          )}h${330}v330H${Number(item?.left)}z`}*/}
          {/*        />*/}
          {/*      </G>*/}
          {/*    )*/}
          {/*  })}*/}
          {path &&
            path.map((item, index) => {
              return (
                <Rect
                  key={index}
                  x={Number(item?.left) - 30}
                  y={Number(item?.top) - top - 40}
                  rx={5}
                  width={400}
                  height={400}
                  fill={item?.color}
                  strokeWidth={35}
                  stroke={'#fff'}
                  style={[
                    svgGeneratorStyles.path,
                    item?.is_active === 0 && { opacity: 0.5 },
                  ]}
                  onPress={() => (item?.is_active === 1 ? onPress(item) : {})}
                />
              )
            })}
          {path &&
            path.map((item, index) => {
              console.log(item?.map_name, 'item?.map_name')
              console.log(item?.map_name.length, 'item?.map_name')
              return (
                <Text
                  key={index + 100}
                  fontSize={130}
                  fontWeight="500"
                  // letterSpacing={0.9}
                  style={{
                    position: 'absolute',
                    textTransform: 'uppercase',
                    textAlign: 'center',
                  }}
                >
                  <TSpan
                    x={Number(item?.left) + (item?.map_name.length > 2 ? 70 : 120)}
                    y={Number(item?.top) - top + 200}
                    fill={backgroundColor ? '#fff' : '#000'}
                  >
                    {item?.map_name}
                  </TSpan>
                </Text>
              )
            })}
        </G>
      </Svg>
    </View>
  )
}
