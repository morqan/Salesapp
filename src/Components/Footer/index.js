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
  homeFooter = 0,
}) {
  const onPressInfo = useCallback(() => {
    navigate('Information', { text: information, title: name })
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
        <MyBtn
          btnStyle={[homeStyles.btn, { minWidth: 100 }]}
          textStyle={homeStyles.btnText}
          text={'information'}
          onPress={onPressInfo}
        />
      )}
      {video && (
        <MyBtn
          btnStyle={[homeStyles.btn, { minWidth: 100 }]}
          textStyle={homeStyles.btnText}
          text={'video'}
        />
      )}
      {pyc && (
        <MyBtn
          btnStyle={[homeStyles.btn, { minWidth: 100 }]}
          textStyle={homeStyles.btnText}
          text={'Portonovi Yacht Club'}
          onPress={onPressPyc}
        />
      )}
      {gallery && (
        <MyBtn
          btnStyle={[homeStyles.btn, { minWidth: 100 }]}
          textStyle={homeStyles.btnText}
          text={'gallery'}
          onPress={onPressGallery}
        />
      )}
      {catalog && (
        <MyBtn
          btnStyle={[homeStyles.btn, { minWidth: 100 }]}
          textStyle={homeStyles.btnText}
          text={'catalog'}
        />
      )}
      {homeFooter.length > 0 &&
        homeFooter.map(item => {
          return (
            <MyBtn
              key={item?.text}
              btnStyle={[homeStyles.btn, { minWidth: 100 }]}
              textStyle={homeStyles.btnText}
              text={item?.text}
            />
          )
        })}
    </View>
  )
}
