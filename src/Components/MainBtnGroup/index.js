import React, { useState, useCallback } from 'react'
import { Image, TouchableOpacity, View } from 'react-native'
import { mainBtnStyles } from '@/Components/MainBtnGroup/index.style'
import btnImg from '../../Assets/Images/pagesicon.png'
import homeIcon from '../../Assets/Images/homeIcon.png'
import mapIcon from '../../Assets/Images/mapIcon.png'
import logoutIcon from '../../Assets/Images/logoutIcon.png'
import portIcon from '../../Assets/Images/portonoviIcon.png'
import { changeToken } from '@/Store/Auth'
import { useDispatch } from 'react-redux'
import { navigate, navigateAndSimpleReset } from '@/Navigators/utils'
import { useAuth } from '@/Hooks/useAuth'
import downloadIcon from '@/Assets/Images/akar-icons_download.png'

export default function MainBtnGroup({
  onOpenDownloadImages,
  home,
}) {
  const { pages } = useAuth()
  const dispatch = useDispatch()
  const [hiddenBox, setHiddenBox] = useState(false)
  const onPressLogOut = () => {
    dispatch(changeToken({ token: null }))
  }

  const onPressPortonovi = useCallback(() => {
    const { content } = pages?.portonovi
    navigate('Information', {
      text: content,
      title: 'PORTONOVI',
      params: pages?.portonovi,
    })
  }, [])

  const onPressMontenegro = useCallback(() => {
    const { content } = pages?.montenegro
    navigate('Montegro', {
      text: content,
      title: 'MONTENEGRO',
      params: pages?.montenegro,
    })
  }, [])

  const goToHome = () => {
    navigateAndSimpleReset('Home')
  }

  return (
    <View style={mainBtnStyles.container}>
      <View
        style={[
          mainBtnStyles.hiddenBtnBox,
          hiddenBox ? { height: home ? 135 : 115 } : { height: 0, opacity: 0 },
        ]}
      >
        {home && (
          <TouchableOpacity
            onPress={onOpenDownloadImages}
            // style={homeStyles.downloadBtnLittle}
          >
            <Image source={downloadIcon} style={{ width: 23, height: 23 }} />
          </TouchableOpacity>
        )}
        <TouchableOpacity onPress={goToHome}>
          <Image source={homeIcon} style={mainBtnStyles.img} />
        </TouchableOpacity>
        <TouchableOpacity onPress={onPressLogOut}>
          <Image source={logoutIcon} style={mainBtnStyles.img} />
        </TouchableOpacity>
        <TouchableOpacity onPress={onPressMontenegro}>
          <Image source={mapIcon} style={mainBtnStyles.img} />
        </TouchableOpacity>
        <TouchableOpacity onPress={onPressPortonovi}>
          <Image source={portIcon} style={mainBtnStyles.img} />
        </TouchableOpacity>
        {/*<TouchableOpacity onPress={onPressVideo}>*/}
        {/*  <Image source={moonIcon} style={mainBtnStyles.img} />*/}
        {/*</TouchableOpacity>*/}
      </View>
      <TouchableOpacity onPress={() => setHiddenBox(!hiddenBox)}>
        <Image source={btnImg} style={{ width: 40, height: 40 }} />
      </TouchableOpacity>
    </View>
  )
}
