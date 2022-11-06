import React from 'react'
import { Text, View } from 'react-native'
import MyInput from '@/Components/MyInput'
import { mailSendStyles } from '@/Components/MailSendModal/index.style'
import MyBtn from '@/Components/MyBtn'

export default function MailSendModal({
  value,
  onChangeText,
  onPressSend,
  onPressCancel,
}) {
  return (
    <View style={mailSendStyles.container}>
      <View>
        <Text style={mailSendStyles.title}>EMAIL PROPERTY DETAILS</Text>
        <MyInput
          placeholder={'Customer email'}
          value={value}
          onChangeText={onChangeText}
        />
        <View style={mailSendStyles.btnBox}>
          <MyBtn
            text={'Send'}
            onPress={onPressSend}
            textStyle={{ color: '#0d6a78' }}
            btnStyle={{ borderColor: '#fff', backgroundColor: '#fff' }}
            containerStyle={{ borderColor: '#fff' }}
          />
          <View style={{ width: 10 }} />
          <MyBtn
            text={'Cancel'}
            onPress={onPressCancel}
            textStyle={{ color: '#0d6a78' }}
            btnStyle={{ borderColor: '#fff', backgroundColor: '#fff' }}
            containerStyle={{ borderColor: '#fff' }}
          />
        </View>
      </View>
    </View>
  )
}
