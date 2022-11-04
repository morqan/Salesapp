import { StyleSheet } from 'react-native'

export const homeStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  logoBox: {
    paddingTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    // marginBottom: 50,
    // backgroundColor: 'green',
    // height: '15%'
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
  mapBox: {
    flex: 1,
    backgroundColor: 'red',
    position: 'relative',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  footer: {
    paddingVertical: 30,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'row',
    // backgroundColor: 'blue',
    height: 200,
  },
  btn: {
    backgroundColor: '#0d6a78',
    borderColor: '#fff',
    borderWidth: 1,
    // minWidth: 100,
  },
  btnText: {
    color: '#fff',
    textTransform: 'uppercase',
  },
})
