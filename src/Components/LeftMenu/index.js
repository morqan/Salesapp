import React, { useCallback } from 'react'
import {
  ScrollView,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native'
import { sideMenuStyles } from '@/Components/LeftMenu/index.style'
import { navigate } from '@/Navigators/utils'
import RenderHtml from 'react-native-render-html'
import { planStyles } from '@/Containers/Private/Plan/index.style'
import { useNetInfo } from '@react-native-community/netinfo'

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
  const netInfo = useNetInfo()
  const onPressGallery = useCallback(() => {
    navigate('Gallery', { gallery: gallery, params })
  }, [gallery, params])

  const onPressPyc = useCallback(() => {
    navigate('PycScreen', { gallery: pyc_gallery, text: pyc, params })
  }, [params, pyc, pyc_gallery])

  const onPressInfo = useCallback(() => {
    if (title === 'MONTENEGRO') {
      navigate('Montegro', { params })
    } else {
      navigate('Information', { text: information, title: name, params })
    }
  }, [information, name, params, title])

  const onPressMap = useCallback(() => {
    const loc = title === 'LIFESTYLE' ? 'LIFESTYLE' : location
    navigate('MapScreen', { img: map, location: loc, params })
  }, [location, map, params, title])

  // console.log(location, 'location left menu')
  // console.log(netInfo, 'netInfo left menu')

  return (
    <ScrollView contentContainerStyle={sideMenuStyles.side}>
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
      {video && netInfo?.isConnected && (
        <TouchableOpacity
          style={sideMenuStyles.menuLink}
          onPress={onPressVideo}
        >
          <Text style={sideMenuStyles.menuLinkText}>video</Text>
        </TouchableOpacity>
      )}
      {pyc && (
        <TouchableOpacity style={sideMenuStyles.menuLink} onPress={onPressPyc}>
          <Text style={sideMenuStyles.menuLinkText}>PORTONOVI YACHT CLUB</Text>
        </TouchableOpacity>
      )}
      {catalog && (
        <TouchableOpacity style={sideMenuStyles.menuLink}>
          <Text style={sideMenuStyles.menuLinkText}>catalog</Text>
        </TouchableOpacity>
      )}
      {map && (
        <TouchableOpacity onPress={onPressMap} style={sideMenuStyles.menuLink}>
          <Text style={sideMenuStyles.menuLinkText}>
            {title === 'LIFESTYLE' ? 'map' : 'location'}
          </Text>
        </TouchableOpacity>
      )}
      {blocks?.data &&
        blocks?.data.map(item => {
          return item?.floors?.data.map(floor => {
            // console.log(floor, 'flasd')
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
        path.map(item => {
          return (
            <TouchableOpacity
              key={item?.id}
              onPress={() => (item?.is_active === 1 ? onOpenPlan(item) : {})}
              style={sideMenuStyles.menuLink}
            >
              <Text style={sideMenuStyles.menuLinkText}>{item?.name}</Text>
            </TouchableOpacity>
          )
        })}
    </ScrollView>
  )
}
