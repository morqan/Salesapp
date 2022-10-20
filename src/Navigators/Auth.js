import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Login from '@/Containers/Auth/Login'

const Stack = createStackNavigator()

// @refresh reset
const AuthNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          tabBarIconStyle: { display: 'none' },
          tabBarLabelPosition: 'beside-icon',
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  )
}

export default AuthNavigator
