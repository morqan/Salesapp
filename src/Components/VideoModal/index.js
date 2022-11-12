import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { homeStyles } from '@/Containers/Private/Home/Iindex.style'
import Video from 'react-native-video'
import { btnStyles } from '@/Components/MyBtn/index.style'

export default function VideoModal({ video, onPressClose }) {
  return (
    <View style={[homeStyles.backgroundVideo]}>
      <Video
        source={{ uri: video }} // Can be a URL or a local file.
        style={homeStyles.video}
        paused={false}
      />
      <View
        style={[
          btnStyles.container,
          { position: 'absolute', top: 60, right: 15 },
        ]}
      >
        <TouchableOpacity
          style={[btnStyles.backBtn]}
          onPress={onPressClose}
          // disabled={disabled}
        >
          <Text style={homeStyles.videoCloseBtnText}>X</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
