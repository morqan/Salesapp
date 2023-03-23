import React, { useCallback } from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import { headerStyles } from '@/Components/MyHeader/index.style'
import SvgArrowLeft from '@/Assets/SvgArrowLeft'
import { useAuth } from '@/Hooks/useAuth'
import { useDispatch } from 'react-redux'
import { changeToken } from '@/Store/Auth'
import { navigateAndSimpleReset } from '@/Navigators/utils'
import downloadIcon from '@/Assets/Images/akar-icons_download.png'
import plogo from '@/Assets/Images/plogo.png'
import logoutImg from '@/Assets/Images/logout.png'

export default function MyHeader({ goBack, onDownloadImages, headerTitle }) {
  const { pages } = useAuth()
  const dispatch = useDispatch()

  const onPressLogOut = () => {
    dispatch(changeToken({ token: null }))
  }

  const onPressPortonovi = useCallback(() => {
    navigateAndSimpleReset('Information', {
      params: pages?.portonovi,
    })
  }, [pages?.portonovi])

  const onPressLifestyle = useCallback(() => {
    navigateAndSimpleReset('Information', {
      params: pages?.lifestyle,
    })
  }, [pages?.lifestyle])

  const onPressMontenegro = useCallback(() => {
    navigateAndSimpleReset('Montegro', {
      params: pages?.montenegro,
    })
  }, [pages?.montenegro])

  const goToHome = useCallback(() => {
    navigateAndSimpleReset('Home')
  }, [])
  console.log(pages, 'pages')
  const onPressGoBack = () => {
    if (headerTitle) {
      goToHome()
    } else {
      goBack()
    }
  }
  return (
    <View style={headerStyles.headerBox}>
      <View style={headerStyles.rightBox}>
        <TouchableOpacity onPress={goToHome} style={headerStyles.logoBtn}>
          {/*<SvgShortLogo />*/}
          <Image
            source={plogo}
            style={{ width: 35, height: 35, resizeMode: 'contain' }}
          />
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
          <TouchableOpacity
            style={headerStyles.backBtn}
            onPress={onPressGoBack}
          >
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
          {/*<SvgLogout />*/}
          <Image
            source={logoutImg}
            style={{ width: 24, height: 24, resizeMode: 'contain' }}
          />
        </TouchableOpacity>
      </View>
    </View>
  )
}
