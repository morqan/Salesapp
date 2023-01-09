import React, { useCallback } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { headerStyles } from '@/Components/MyHeader/index.style'
import SvgShortLogo from '@/Assets/Images/SvgShortLogo'
import SvgLogout from '@/Assets/SvgLogout'
import SvgArrowLeft from '@/Assets/SvgArrowLeft'
import { useAuth } from '@/Hooks/useAuth'
import { useDispatch } from 'react-redux'
import { changeToken } from '@/Store/Auth'
import { navigate, navigateAndSimpleReset } from '@/Navigators/utils'

export default function MyHeader({ goBack }) {
  const { pages } = useAuth()
  const dispatch = useDispatch()

  const onPressLogOut = () => {
    dispatch(changeToken({ token: null }))
  }

  const onPressPortonovi = useCallback(() => {
    const { content } = pages?.portonovi
    navigate('Information', {
      text: content,
      title: 'PORTONOVI',
      params: pages?.portonovi,
      location: 'portonovi',
    })
  }, [])

  const onPressLifestyle = useCallback(() => {
    const { content } = pages?.lifestyle
    navigate('Information', {
      text: content,
      title: 'LIFESTYLE',
      params: pages?.lifestyle,
    })
  }, [])

  const onPressMontenegro = useCallback(() => {
    const { content } = pages?.montenegro
    navigate('Montegro', {
      text: content,
      title: 'MONTENEGRO',
      params: pages?.montenegro,
      location: 'montenegro',

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
          <SvgShortLogo />
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
