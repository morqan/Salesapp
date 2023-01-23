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
    navigate('Gallery', { gallery: gallery, params })
  }, [])

  const onPressPyc = useCallback(() => {
    navigate('PycScreen', { gallery: pyc_gallery, text: pyc, params })
  }, [])

  const onPressInfo = useCallback(() => {
    if (title === 'MONTENEGRO') {
      navigate('Montegro', { params })
    } else {
      navigate('Information', { text: information, title: name, params })
    }
  }, [])

  const onPressMap = useCallback(() => {
    const loc = title === 'LIFESTYLE' ? 'LIFESTYLE' : location
    navigate('MapScreen', { img: map, location: loc, params })
  }, [])

  console.log(location, 'location left menu')

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
          <Text style={sideMenuStyles.menuLinkText}>map</Text>
        </TouchableOpacity>
      )}
      {location && (
        <TouchableOpacity onPress={onPressMap} style={sideMenuStyles.menuLink}>
          <Text style={sideMenuStyles.menuLinkText}>location</Text>
        </TouchableOpacity>
      )}

      {blocks?.data &&
        blocks?.data.map(item => {
          return item?.floors?.data.map(floor => {
            console.log(floor, 'flasd')
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
          console.log(item, 'item')

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
