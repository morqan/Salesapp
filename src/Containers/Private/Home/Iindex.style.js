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
    justifyContent: 'center',
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
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.8)',
  },
  video: {
    position: 'absolute',
    top: 0,
    left: 20,
    bottom: 0,
    right: 20,
  },
  videoCloseBtn: {
    position: 'absolute',
    top: 60,
    right: 15,
    // zIndex: 9999999,
    backgroundColor: '#0d6a78',
    width: 25,
    height: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  videoCloseBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  spinnerBox: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#fff',
  },
  downloadHint: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100
  },
  downloadHintText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 20,
  }
})
