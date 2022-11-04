import { StyleSheet } from 'react-native'

export const projectStyles = StyleSheet.create({
  projectHead: {
    justifyContent: 'flex-end',
    padding: 10,
    flexDirection: 'row',
  },
  absoluteHead: {
    position: 'absolute',
    top: 10,
    right: 15,
    zIndex: 999,
    // width: 25,
    // height: 25,
  },
  container: {
    flex: 1,
    paddingRight: 20,
    paddingTop: 20,
    backgroundColor: '#fff',
  },
})
