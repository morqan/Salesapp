import React, { useCallback, useEffect, useState } from 'react'
import { Image, ScrollView, Text, View } from "react-native"
import { styles } from '@/Containers/Auth/Login/index.style'
import MyInput from '@/Components/MyInput'
import MyBtn from '@/Components/MyBtn'
import { useOnLoginMutation } from '@/Services/modules/Auth'
import { useDispatch } from 'react-redux'
import { changeToken, changeUser } from '@/Store/Auth'
import logo from '../../../Assets/Images/logo.png'
import { homeStyles } from "@/Containers/Private/Home/Iindex.style"

export default function Login() {
  const dispatch = useDispatch()

  const [login, setLogin] = useState('')
  const [pass, setPass] = useState('')
  const [onLogin, { data, isSuccess, isLoading, isError, error }] =
    useOnLoginMutation()
  useEffect(() => {
    if (isSuccess) {
      const { token, user } = data
      dispatch(changeToken({ token }))
      dispatch(changeUser({ userData: user }))
    }
    if (isError) {
      console.log(error, 'error')
    }
  }, [isSuccess, isLoading])

  const onPressLogin = useCallback(() => {
    const body = {
      email: login,
      password: pass,
    }

    onLogin(body).unwrap()
  }, [login, pass])

  const onChangeLogin = text => {
    setLogin(text)
  }
  const onChangePass = text => {
    setPass(text)
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.logoBox}>
        <Image source={logo} style={homeStyles.logo} />
      </View>
      <View style={styles.form}>
        <View style={styles.inputBox}>
          <MyInput
            value={login}
            placeholder={'Login'}
            onChangeText={text => onChangeLogin(text)}
          />
        </View>
        <View style={styles.inputBox}>
          <MyInput
            placeholder={'Password'}
            value={pass}
            onChangeText={text => onChangePass(text)}
          />
        </View>
        <MyBtn
          text={'SIGN IN'}
          onPress={onPressLogin}
          btnStyle={{ backgroundColor: '#fff' }}
          textStyle={{ color: '#000' }}
        />
      </View>
      <Text style={styles.errText}>{error?.data?.error}</Text>
    </ScrollView>
  )
}
