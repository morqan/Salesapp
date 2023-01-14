import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { hfStyles } from '@/Components/HomeFooter/index.style'

export default function HomeFooter({ homeItems, onPress }) {
  return (
    <View style={hfStyles.container}>
      {homeItems.map(item => {
        return (
          <TouchableOpacity
            onPress={() => (item?.is_active === 1 ? onPress(item) : {})}
            style={hfStyles.linkBox}
            key={item?.id}
          >
            <View style={[hfStyles.linkId, { backgroundColor: item?.color }]}>
              <Text style={{ color: '#fff' }}>{item?.map_name}</Text>
            </View>
            <Text style={hfStyles.linkName}>{item?.name}</Text>
          </TouchableOpacity>
        )
      })}
    </View>
  )
}
