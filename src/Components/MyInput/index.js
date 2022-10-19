import React from 'react'
import { TextInput, View } from 'react-native'
import { inputStyles } from '@/Components/MyInput/index.style'

export default function MyInput({ placeholder, onChangeText, value }) {
  return (
    <View style={inputStyles.container}>
      <TextInput
        style={inputStyles.input}
        placeholderTextColor={'#fff'}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  )
}
