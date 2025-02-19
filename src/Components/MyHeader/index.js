import React, { useCallback, useEffect } from 'react'
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
import {
  AccessibilityText,
  AccessibilityView,
  AccessibilityButton,
  AccessibilityImage,
  AccessibilityTextInput,
  AccessibilityScrollView,
  AccessibilityTouchableOpacity,
  AccessibilityPressable,
  AccessibilityKeyboardAvoiding,
  AccessibilityRenderImageExternal
} from '@corpowid/accessibility-widget';
export default function MyHeader({ goBack, onDownloadImages, headerTitle }) {
  const { pages, needReLogin } = useAuth()
  const dispatch = useDispatch()

  const onPressLogOut = useCallback(() => {
    dispatch(changeToken({ token: null }))
  }, [dispatch])

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
  console.log(needReLogin, 'needReLogin')
  useEffect(() => {
    if (needReLogin) {
      onPressLogOut()
    }
  }, [needReLogin, onPressLogOut])
  const onPressGoBack = () => {
    if (headerTitle) {
      goToHome()
    } else {
      goBack()
    }
  }
  return (
    <AccessibilityView style={headerStyles.headerBox}>
      <AccessibilityView style={headerStyles.rightBox}>
        <AccessibilityTouchableOpacity onPress={goToHome} style={headerStyles.logoBtn}>
          <AccessibilityImage
            source={plogo}
            style={{ width: 35, height: 35, resizeMode: 'contain' }}
          />
        </AccessibilityTouchableOpacity>
        <AccessibilityView style={headerStyles.linkBox}>
          <AccessibilityTouchableOpacity onPress={onPressMontenegro}>
            <AccessibilityText style={headerStyles.linkBtn}>MONTENEGRO</AccessibilityText>
          </AccessibilityTouchableOpacity>
          <AccessibilityTouchableOpacity onPress={onPressPortonovi}>
            <AccessibilityText style={headerStyles.linkBtn}>PORTONOVI</AccessibilityText>
          </AccessibilityTouchableOpacity>
          <AccessibilityTouchableOpacity onPress={onPressLifestyle}>
            <AccessibilityText style={headerStyles.linkBtn}>Lifestyle</AccessibilityText>
          </AccessibilityTouchableOpacity>
        </AccessibilityView>
      </AccessibilityView>
      <AccessibilityView style={headerStyles.rightBox}>
        {goBack && (
          <AccessibilityTouchableOpacity
            style={headerStyles.backBtn}
            onPress={onPressGoBack}
          >
            <SvgArrowLeft />
          </AccessibilityTouchableOpacity>
        )}
        {onDownloadImages && (
          <AccessibilityTouchableOpacity
            onPress={onDownloadImages}
            style={headerStyles.backBtn}
          >
            <AccessibilityImage source={downloadIcon} style={{ width: 23, height: 23 }} />
          </AccessibilityTouchableOpacity>
        )}
        <AccessibilityTouchableOpacity
          onPress={onPressLogOut}
          style={headerStyles.logoutBtn}
        >
          <AccessibilityImage
            source={logoutImg}
            style={{ width: 24, height: 24, resizeMode: 'contain' }}
          />
        </AccessibilityTouchableOpacity>
      </AccessibilityView>
    </AccessibilityView>
  )
}
