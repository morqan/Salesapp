import React, { useCallback } from 'react'
import { View } from 'react-native'
import { homeStyles } from '@/Containers/Private/Home/Iindex.style'
import MyBtn from '@/Components/MyBtn'
import { navigate } from '@/Navigators/utils'

export default function Footer({
  gallery,
  information,
  video,
  pyc,
  catalog,
  name,
  pyc_gallery,
  onPressVideo,
  params,
  lifestyle,
  montenegro,
  portonovi,
}) {
  const onPressInfo = useCallback(() => {
    navigate('Information', { text: information, title: name, params })
  }, [])

  const onPressLifestyle = useCallback(() => {
    const { content } = lifestyle
    navigate('Information', {
      text: content,
      title: 'LIFESTYLE',
      params: lifestyle,
    })
  }, [])

  const onPressGallery = useCallback(() => {
    navigate('Gallery', { gallery: gallery })
  }, [])

  const onPressPyc = useCallback(() => {
    navigate('PycScreen', { gallery: pyc_gallery, text: pyc })
  }, [])
  return (
    <View style={homeStyles.footer}>
      {information && (
        <View style={{ marginRight: 10 }}>
          <MyBtn
            btnStyle={[homeStyles.btn, { minWidth: 100 }]}
            textStyle={homeStyles.btnText}
            text={'information'}
            onPress={onPressInfo}
          />
        </View>
      )}
      {video && (
        <View style={{ marginRight: 10 }}>
          <MyBtn
            btnStyle={[homeStyles.btn, { minWidth: 100 }]}
            textStyle={homeStyles.btnText}
            text={'video'}
            onPress={onPressVideo}
          />
        </View>
      )}
      {pyc && (
        <View style={{ marginRight: 10 }}>
          <MyBtn
            btnStyle={[homeStyles.btn, { minWidth: 100 }]}
            textStyle={homeStyles.btnText}
            text={'Portonovi Yacht Club'}
            onPress={onPressPyc}
          />
        </View>
      )}
      {gallery && (
        <View style={{ marginRight: 10 }}>
          <MyBtn
            btnStyle={[homeStyles.btn, { minWidth: 100 }]}
            textStyle={homeStyles.btnText}
            text={'gallery'}
            onPress={onPressGallery}
          />
        </View>
      )}
      {catalog && (
        <View style={{ marginRight: 10 }}>
          <MyBtn
            btnStyle={[homeStyles.btn, { minWidth: 100 }]}
            textStyle={homeStyles.btnText}
            text={'catalog'}
          />
        </View>
      )}
      {montenegro && (
        <View style={{ marginRight: 10 }}>
          <MyBtn
            btnStyle={[homeStyles.btn, { minWidth: 100 }]}
            textStyle={homeStyles.btnText}
            text={'MONTENEGRO'}
          />
        </View>
      )}
      {portonovi && (
        <View style={{ marginRight: 10 }}>
          <MyBtn
            btnStyle={[homeStyles.btn, { minWidth: 100 }]}
            textStyle={homeStyles.btnText}
            text={'PORTONOVI'}
          />
        </View>
      )}
      {lifestyle && (
        <View style={{ marginRight: 10 }}>
          <MyBtn
            btnStyle={[homeStyles.btn, { minWidth: 100 }]}
            textStyle={homeStyles.btnText}
            text={'LIFESTYLE'}
            onPress={onPressLifestyle}
          />
        </View>
      )}
    </View>
  )
}
