import { StyleSheet } from 'react-native'

export const mailSendStyles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#0d6a78',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999999,
  },
  title: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 30,
    lineHeight: 30,
    marginBottom: 30,
  },
  btnBox: {
    flexDirection: 'row',
    marginTop: 20,
  },
})
