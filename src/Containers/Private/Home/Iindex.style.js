import { StyleSheet } from 'react-native'

export const homeStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  logoBox: {
    paddingVertical: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 50,
    // backgroundColor: 'green',
    // height: '15%'
  },
  logo: {
    fontSize: 25,
    fontWeight: 'bold',
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
  },
  btnText: {
    color: '#fff',
  },
})
