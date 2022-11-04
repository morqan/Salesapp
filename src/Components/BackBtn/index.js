import React from 'react'
import { Text, View } from 'react-native'
import { btnStyles } from '@/Components/MyBtn/index.style'
import { TouchableOpacity } from 'react-native-gesture-handler'
import SvgLeftArrow from '@/Assets/SvgLeftArrow'

export default function BackBtn({ onPress, btnStyle, containerStyle }) {
  return (
    <View style={[btnStyles.container, containerStyle]}>
      <TouchableOpacity
        style={[btnStyles.backBtn, btnStyle]}
        onPress={onPress}
        // disabled={disabled}
      >
        <SvgLeftArrow />
      </TouchableOpacity>
    </View>
  )
}
