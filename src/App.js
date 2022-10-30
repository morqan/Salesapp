import 'react-native-gesture-handler'
import React from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/lib/integration/react'
import { store, persistor } from '@/Store'
import ApplicationNavigator from '@/Navigators/Application'
import './Translations'
import { CacheManager } from '@georstat/react-native-image-cache'
import { Dirs } from 'react-native-file-access'

CacheManager.config = {
  baseDir: `${Dirs.CacheDir}/images_cache/`,
  blurRadius: 15,
  cacheLimit: 1024 * 1024 * 256, // ~256MB
  sourceAnimationDuration: 1000,
  thumbnailAnimationDuration: 1000,
  getCustomCacheKey: (source: string) => {
    // Remove params from the URL for caching images (useful for caching images from Amazons S3 bucket and etc)
    let newCacheKey = source
    if (source.includes('?')) {
      newCacheKey = source.substring(0, source.lastIndexOf('?'))
    }
    return newCacheKey
  },
}
const App = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ApplicationNavigator />
    </PersistGate>
  </Provider>
)

export default App
