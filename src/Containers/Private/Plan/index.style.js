import { StyleSheet } from 'react-native'

export const planStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backBtnBox: {
    position: 'absolute',
    top: 5,
    right: 15,
    zIndex: 9999,
    width: 50,
  },
  header: {
    // marginTop: -30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    // height: 70
  },
})
