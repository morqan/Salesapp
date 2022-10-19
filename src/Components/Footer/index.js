import React from 'react'
import { View } from 'react-native'
import { homeStyles } from '@/Containers/Private/Home/Iindex.style'
import MyBtn from '@/Components/MyBtn'

export default function Footer({ links=[1,2,4] }) {
  return (
    <View style={homeStyles.footer}>
      {links &&
        links.map((item,index) => {
          return (
            <MyBtn
              key={index}
              btnStyle={homeStyles.btn}
              textStyle={homeStyles.btnText}
              text={'montenegro'}
            />
          )
        })}
    </View>
  )
}
