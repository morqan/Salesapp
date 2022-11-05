import { StyleSheet } from 'react-native'

export const mainBtnStyles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    alignItems: 'center',
    zIndex: 9999
  },
  img: {
    width: 30,
    height: 30,
    // resizeMode: 'contain',
  },
  hiddenBtnBox: {
    backgroundColor: '#fff',
    height: 160,
    width: 40,
    marginBottom: 10,
    alignItems: 'center',
    padding: 5,
  },
})
