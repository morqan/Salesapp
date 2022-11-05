import { StyleSheet } from 'react-native'

export const btnStyles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#9b8264',
    alignSelf: 'flex-start',
    padding: 1,
  },
  btn: {
    borderColor: '#9b8264',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 5,
    paddingTop: 3,
    paddingHorizontal: 8,
    paddingVertical: 2,
    backgroundColor: '#9b8264',
  },
  backBtn: {
    backgroundColor: '#0d6a78',
    width: 25,
    height: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    color: 'red',
    fontSize: 15,
    fontWeight: '500',
  },
})
