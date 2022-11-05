import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { homeStyles } from '@/Containers/Private/Home/Iindex.style'
import Video from 'react-native-video'

export default function VideoModal({ video, onPressClose }) {
  return (
    <View style={[homeStyles.backgroundVideo]}>
      <Video
        source={{ uri: video }} // Can be a URL or a local file.
        style={homeStyles.video}
        paused={false}
      />
      <TouchableOpacity onPress={onPressClose} style={homeStyles.videoCloseBtn}>
        <Text style={homeStyles.videoCloseBtnText}>X</Text>
      </TouchableOpacity>
    </View>
  )
}
