import React, { useEffect, useState } from 'react'
import Svg, { G, Path, Text, TSpan, Image } from 'react-native-svg'
import { svgGeneratorStyles } from '@/Components/SvgGenerator/index.style'
import { Dimensions, View } from 'react-native'
import { useAuth } from '@/Hooks/useAuth'

export default function FloorSvgGenerator({
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
  const windowWidth = Dimensions.get('window').width * 0.9
  const { localImagesUrls } = useAuth()
  const [localImg, setLocalImg] = useState('')

  useEffect(() => {
    const newImg = img.replace(' ', '%20')
    localImagesUrls.filter(x => {
      if (x?.id === newImg) {
        console.log(x, 'xxxs')
        setLocalImg(`${x?.localUrl}`)
      }
    })
  }, [])
  console.log(localImg, 'localImg')
  // console.log(localImagesUrls, 'localImagesUrlslocalImagesUrls')
  return (
    <View
      style={{
        width: windowWidth,
        aspectRatio,
        // alignItems: 'center',
        // justifyContent: 'center',
      }}
    >
      <Svg
        width="85%"
        height="85%"
        viewBox={`0 0 ${originalWidth} ${originalHeight}`}
        xmlns="http://www.w3.org/2000/svg"
        xmlSpace="preserve"
        style={{ width: '100%', height: '100%' }}
        xmlnsXlink="http://www.w3.org/1999/xlink"
      >
        <G id="Layer_x0020_1">
          {localImg && (
            <Image
              width={originalWidth}
              height={originalHeight}
              xlinkHref={localImg}
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
                    backgroundColor && {
                      fill: backgroundColor,
                      opacity: item?.is_sold ? 0.6 : 0,
                    },
                  ]}
                  onPress={() => (item?.is_active === 1 ? onPress(item) : {})}
                  d={`M${Number(item?.left)} ${Number(
                    item?.top - top,
                  )}h${1500}v430H${Number(item?.left)}z`}
                  stroke="#AC7D3A"
                  strokeWidth={10}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              )
            })}
        </G>
      </Svg>
    </View>
  )
}
