import { StyleSheet } from 'react-native'

export const successModalStyles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.8)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    width: 350,
    height: 150,
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
  },
  title: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: '500',
    lineHeight: 25,
    marginBottom: 20
  }
})
