import React, { useCallback } from 'react'
import { Dimensions, Text, View } from 'react-native'
import { infoStyles } from '@/Containers/Private/Information/index.style'
import RenderHtml from 'react-native-render-html'
import { planStyles } from '@/Containers/Private/Plan/index.style'
import MyBtn from '@/Components/MyBtn'
import { homeStyles } from '@/Containers/Private/Home/Iindex.style'
import { navigationRef } from '@/Navigators/utils'

export default function Information(props) {
  const { title, text } = props?.route?.params
  const width = Dimensions.get('window').width
  const source = {
    html: `${text}`,
  }
  const goBack = useCallback(() => {
    navigationRef.goBack()
  }, [])
  console.log(props?.route?.params, 'props?.route?.params')
  return (
    <View style={infoStyles.container}>
      <Text style={infoStyles.title}>{title}</Text>
      <RenderHtml contentWidth={width} source={source} />
      <View style={planStyles.backBtnBox}>
        <MyBtn
          btnStyle={homeStyles.btn}
          textStyle={homeStyles.btnText}
          containerStyle={{ width: '100%' }}
          text={'<'}
          onPress={goBack}
        />
      </View>
    </View>
  )
}
