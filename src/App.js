import 'react-native-gesture-handler'
import React from 'react'
import { Provider } from 'react-redux'
import { AccessibilityProvider } from '@corpowid/accessibility-widget'
import { PersistGate } from 'redux-persist/lib/integration/react'
import { store, persistor } from '@/Store'
import ApplicationNavigator from '@/Navigators/Application'
import './Translations'

const Root = () => {
  return (
    <PersistGate loading={null} persistor={persistor}>
      <ApplicationNavigator />
    </PersistGate>
  )
}

const App = () => {
  return (
    <AccessibilityProvider apiKey="dwqfwew">
      <Provider store={store}>
        <Root />
      </Provider>
    </AccessibilityProvider>
  )
}

export default App
