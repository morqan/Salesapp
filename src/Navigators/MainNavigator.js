import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Home from '@/Containers/Private/Home'
import Details from '@/Containers/Private/Details'
import Project from '@/Containers/Private/Project'
import Floor from '@/Containers/Private/Floor'
import Plan from '@/Containers/Private/Plan'
import Information from '@/Containers/Private/Information'
import Gallery from '@/Containers/Private/Gallery'
import PycScreen from '@/Containers/Private/PycScreen'

const Stack = createStackNavigator()

// @refresh reset
const MainNavigator = () => {
  const option = {
    tabBarIconStyle: { display: 'none' },
    tabBarLabelPosition: 'beside-icon',
    headerShown: false,
  }
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} options={option} />
      <Stack.Screen name="Project" component={Project} options={option} />
      <Stack.Screen name="Details" component={Details} options={option} />
      <Stack.Screen name="Floor" component={Floor} options={option} />
      <Stack.Screen name="Plan" component={Plan} options={option} />
      <Stack.Screen
        name="Information"
        component={Information}
        options={option}
      />
      <Stack.Screen name="Gallery" component={Gallery} options={option} />
      <Stack.Screen name="PycScreen" component={PycScreen} options={option} />
    </Stack.Navigator>
  )
}

export default MainNavigator
