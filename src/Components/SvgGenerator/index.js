import React, { useEffect, useState } from 'react'
import Svg, { G, Path, Text, TSpan, Image } from 'react-native-svg'
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
    const newImg = img.replace(' ', '%20')
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
          {path &&
            path.map((item, index) => {
              return (
                <Path
                  key={index}
                  className="fil0"
                  style={[
                    svgGeneratorStyles.path,
                    backgroundColor && { fill: backgroundColor },
                    item?.is_active === 0 && { opacity: 0.5 },
                  ]}
                  onPress={() => (item?.is_active === 1 ? onPress(item) : {})}
                  d={`M${Number(item?.left)} ${Number(
                    item?.top - top,
                  )}h${330}v330H${Number(item?.left)}z`}
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
                    x={Number(item?.left) + 120}
                    y={Number(item?.top) - top + 200}
                    fill={backgroundColor ? '#fff' : '#000'}
                  >
                    {item?.id}
                  </TSpan>
                </Text>
              )
            })}
        </G>
      </Svg>
    </View>
  )
}
