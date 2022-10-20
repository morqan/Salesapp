import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Home from '@/Containers/Private/Home'
import Details from '@/Containers/Private/Details'
import Project from '@/Containers/Private/Project'
import Floor from '@/Containers/Private/Floor'
import Plan from '@/Containers/Private/Plan'

const Stack = createStackNavigator()

// @refresh reset
const MainNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIconStyle: { display: 'none' },
          tabBarLabelPosition: 'beside-icon',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Project"
        component={Project}
        options={{
          tabBarIconStyle: { display: 'none' },
          tabBarLabelPosition: 'beside-icon',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Details"
        component={Details}
        options={{
          tabBarIconStyle: { display: 'none' },
          tabBarLabelPosition: 'beside-icon',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Floor"
        component={Floor}
        options={{
          tabBarIconStyle: { display: 'none' },
          tabBarLabelPosition: 'beside-icon',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Plan"
        component={Plan}
        options={{
          tabBarIconStyle: { display: 'none' },
          tabBarLabelPosition: 'beside-icon',
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  )
}

export default MainNavigator
