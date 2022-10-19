import React from 'react'
import { Text, View } from 'react-native'
import { btnStyles } from '@/Components/MyBtn/index.style'
import { TouchableOpacity } from 'react-native-gesture-handler'

export default function MyBtn({
  text,
  onPress,
  btnStyle,
  containerStyle,
  textStyle,
  disabled,
}) {
  return (
    <View style={[btnStyles.container, containerStyle]}>
      <TouchableOpacity
        style={[btnStyles.btn, btnStyle]}
        onPress={onPress}
        // disabled={disabled}
      >
        <Text style={[textStyle]}>{text}</Text>
      </TouchableOpacity>
    </View>
  )
}
