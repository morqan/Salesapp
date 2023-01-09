import React from 'react'
import { Text, View } from 'react-native'
import { hfStyles } from '@/Components/HomeFooter/index.style'

export default function HomeFooter({ homeItems }) {
  return (
    <View style={hfStyles.container}>
      {homeItems.map(item => {
        return (
          <View style={hfStyles.linkBox} key={item?.id}>
            <View style={hfStyles.linkId}>
              <Text style={{ color: '#fff' }}>{item?.id}</Text>
            </View>
            <Text style={hfStyles.linkName}>{item?.name}</Text>
          </View>
        )
      })}
    </View>
  )
}
