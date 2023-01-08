import React, { useCallback } from 'react'
import { Text, TouchableOpacity, useWindowDimensions, View } from "react-native"
import { sideMenuStyles } from '@/Components/LeftMenu/index.style'
import { navigate } from '@/Navigators/utils'
import { Path } from 'react-native-svg'
import { svgGeneratorStyles } from '@/Components/SvgGenerator/index.style'
import RenderHtml from 'react-native-render-html'
import { planStyles } from '@/Containers/Private/Plan/index.style'

export default function LeftMenu({
  title,
  gallery,
  information,
  video,
  pyc,
  catalog,
  name,
  pyc_gallery,
  onPressVideo,
  params,
  map,
  location,
  blocks,
  onOpenFloor,
  path,
  onOpenPlan,
  project,
  headInfo,
}) {
  const { width } = useWindowDimensions()

  const onPressGallery = useCallback(() => {
    navigate('Gallery', { gallery: gallery })
  }, [])

  const onPressPyc = useCallback(() => {
    navigate('PycScreen', { gallery: pyc_gallery, text: pyc })
  }, [])

  const onPressInfo = useCallback(() => {
    navigate('Information', { text: information, title: name, params })
  }, [])

  return (
    <View style={sideMenuStyles.side}>
      <Text style={sideMenuStyles.title}>{title}</Text>
      {project && (
        <View style={sideMenuStyles.planNameBox}>
          <Text style={sideMenuStyles.planNameTitle}>{project}</Text>
          <Text style={sideMenuStyles.planNameText}>{name}</Text>
        </View>
      )}
      {headInfo &&
        headInfo.map((item, index) => {
          return (
            <RenderHtml
              tagsStyles={planStyles.tagsLeftStyles}
              key={index}
              contentWidth={width}
              source={item}
            />
          )
        })}
      {information && (
        <TouchableOpacity style={sideMenuStyles.menuLink} onPress={onPressInfo}>
          <Text style={sideMenuStyles.menuLinkText}>information</Text>
        </TouchableOpacity>
      )}
      {gallery && (
        <TouchableOpacity
          style={sideMenuStyles.menuLink}
          onPress={onPressGallery}
        >
          <Text style={sideMenuStyles.menuLinkText}>gallery</Text>
        </TouchableOpacity>
      )}
      {video && (
        <TouchableOpacity
          style={sideMenuStyles.menuLink}
          onPress={onPressVideo}
        >
          <Text style={sideMenuStyles.menuLinkText}>video</Text>
        </TouchableOpacity>
      )}
      {pyc && (
        <TouchableOpacity style={sideMenuStyles.menuLink} onPress={onPressPyc}>
          <Text style={sideMenuStyles.menuLinkText}>pyc</Text>
        </TouchableOpacity>
      )}
      {catalog && (
        <TouchableOpacity style={sideMenuStyles.menuLink}>
          <Text style={sideMenuStyles.menuLinkText}>catalog</Text>
        </TouchableOpacity>
      )}
      {map && (
        <TouchableOpacity style={sideMenuStyles.menuLink}>
          <Text style={sideMenuStyles.menuLinkText}>map</Text>
        </TouchableOpacity>
      )}
      {location && (
        <TouchableOpacity style={sideMenuStyles.menuLink}>
          <Text style={sideMenuStyles.menuLinkText}>location</Text>
        </TouchableOpacity>
      )}

      {blocks?.data &&
        blocks?.data.map(item => {
          return item?.floors?.data.map(floor => {
            return (
              <TouchableOpacity
                key={floor?.id}
                onPress={() => onOpenFloor(floor)}
                style={sideMenuStyles.menuLink}
              >
                <Text style={sideMenuStyles.menuLinkText}>{floor?.name}</Text>
              </TouchableOpacity>
            )
          })
        })}
      {path &&
        path.map((item, index) => {
          return (
            <TouchableOpacity
              key={item?.id}
              onPress={() => onOpenPlan(item)}
              style={sideMenuStyles.menuLink}
            >
              <Text style={sideMenuStyles.menuLinkText}>{item?.name}</Text>
            </TouchableOpacity>
          )
        })}
    </View>
  )
}