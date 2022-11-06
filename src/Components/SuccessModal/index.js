import React from 'react'
import { Text, View } from 'react-native'
import { successModalStyles } from '@/Components/SuccessModal/index.style'
import MyBtn from '@/Components/MyBtn'

export default function SuccessModal({ onPress }) {
  return (
    <View style={successModalStyles.container}>
      <View style={successModalStyles.content}>
        <Text style={successModalStyles.title}>
          Property Plan Sent Your Email Address
        </Text>
        <View style={{ marginLeft: 110 }}>
          <MyBtn
            text={'OK'}
            onPress={onPress}
            textStyle={{ color: '#fff' }}
            btnStyle={{ borderColor: '#0d6a78', backgroundColor: '#0d6a78' }}
            containerStyle={{ borderColor: '#0d6a78', width: 100 }}
          />
        </View>
      </View>
    </View>
  )
}
