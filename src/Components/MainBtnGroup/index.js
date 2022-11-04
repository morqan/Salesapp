import React, { useState } from 'react'
import { Image, TouchableOpacity, View } from 'react-native'
import { mainBtnStyles } from '@/Components/MainBtnGroup/index.style'
import btnImg from '../../Assets/Images/40.png'
import homeIcon from '../../Assets/Images/homeIcon.png'
import mapIcon from '../../Assets/Images/mapIcon.png'
import logoutIcon from '../../Assets/Images/logoutIcon.png'
import portIcon from '../../Assets/Images/portonoviIcon.png'
import moonIcon from '../../Assets/Images/moonIcon.png'
import { changeToken } from '@/Store/Auth'
import { useDispatch } from 'react-redux'
import { navigate, navigateAndSimpleReset } from "@/Navigators/utils"

export default function MainBtnGroup(props) {
  const dispatch = useDispatch()
  const [hiddenBox, setHiddenBox] = useState(false)
  const onPressLogOut = () => {
    dispatch(changeToken({ token: null }))
  }

  const goToHome = () => {
    navigateAndSimpleReset('Home')
  }
  return (
    <View style={mainBtnStyles.container}>
      <View
        style={[
          mainBtnStyles.hiddenBtnBox,
          hiddenBox ? { height: 160 } : { height: 0, opacity: 0 },
        ]}
      >
        <TouchableOpacity onPress={goToHome}>
          <Image source={homeIcon} style={mainBtnStyles.img} />
        </TouchableOpacity>
        <TouchableOpacity onPress={onPressLogOut}>
          <Image source={logoutIcon} style={mainBtnStyles.img} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image source={mapIcon} style={mainBtnStyles.img} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image source={portIcon} style={mainBtnStyles.img} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image source={moonIcon} style={mainBtnStyles.img} />
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={() => setHiddenBox(!hiddenBox)}>
        <Image source={btnImg} style={mainBtnStyles.img} />
      </TouchableOpacity>
    </View>
  )
}
