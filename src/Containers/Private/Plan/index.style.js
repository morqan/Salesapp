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
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingHorizontal: 70,
    top: 20,
    right: 15,
    zIndex: 999,
    height: 100,
  },
  slideBox: {
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'red',
    // marginTop: -100
  },
  sliderImg: {
    width: '90%',
    height: '90%',
    resizeMode: 'contain',
  },
  sliderAbsoluteBox: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    backgroundColor: 'rgba(0,139,160,.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sliderAbsoluteText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 120,
    lineHeight: 120,
    textTransform: 'uppercase',
  },
})
