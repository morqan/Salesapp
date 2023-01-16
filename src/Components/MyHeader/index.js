import React, { useCallback } from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import { headerStyles } from '@/Components/MyHeader/index.style'
import SvgShortLogo from '@/Assets/Images/SvgShortLogo'
import SvgLogout from '@/Assets/SvgLogout'
import SvgArrowLeft from '@/Assets/SvgArrowLeft'
import { useAuth } from '@/Hooks/useAuth'
import { useDispatch } from 'react-redux'
import { changeToken } from '@/Store/Auth'
import { navigate, navigateAndSimpleReset } from '@/Navigators/utils'
import downloadIcon from '@/Assets/Images/akar-icons_download.png'
import plogo from '@/Assets/Images/plogo.png'

export default function MyHeader({ goBack, onDownloadImages }) {
  const { pages } = useAuth()
  const dispatch = useDispatch()

  const onPressLogOut = () => {
    dispatch(changeToken({ token: null }))
  }

  const onPressPortonovi = useCallback(() => {
    navigate('Information', {
      params: pages?.portonovi,
    })
  }, [])

  const onPressLifestyle = useCallback(() => {
    navigate('Information', {
      params: pages?.lifestyle,
    })
  }, [])

  const onPressMontenegro = useCallback(() => {
    navigate('Montegro', {
      params: pages?.montenegro,
    })
  }, [])

  const goToHome = useCallback(() => {
    navigateAndSimpleReset('Home')
  }, [])
  console.log(pages, 'pages')
  return (
    <View style={headerStyles.headerBox}>
      <View style={headerStyles.rightBox}>
        <TouchableOpacity onPress={goToHome} style={headerStyles.logoBtn}>
          {/*<SvgShortLogo />*/}
          <Image source={plogo} style={{width: 35, height: 35, resizeMode: 'contain'}} />
        </TouchableOpacity>
        <View style={headerStyles.linkBox}>
          <TouchableOpacity onPress={onPressMontenegro}>
            <Text style={headerStyles.linkBtn}>MONTENEGRO</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onPressPortonovi}>
            <Text style={headerStyles.linkBtn}>PORTONOVI</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onPressLifestyle}>
            <Text style={headerStyles.linkBtn}>Lifestyle</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={headerStyles.rightBox}>
        {goBack && (
          <TouchableOpacity style={headerStyles.backBtn} onPress={goBack}>
            <SvgArrowLeft />
          </TouchableOpacity>
        )}
        {onDownloadImages && (
          <TouchableOpacity
            onPress={onDownloadImages}
            style={headerStyles.backBtn}
          >
            <Image source={downloadIcon} style={{ width: 23, height: 23 }} />
          </TouchableOpacity>
        )}
        <TouchableOpacity
          onPress={onPressLogOut}
          style={headerStyles.logoutBtn}
        >
          <SvgLogout />
        </TouchableOpacity>
      </View>
    </View>
  )
}
