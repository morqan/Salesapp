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
    // width: 50,
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
    // backgroundColor: 'red'
  },
  slideBox: {
    alignItems: 'center',
    justifyContent: 'center',
    // flex: 1,
    // backgroundColor: 'green',
  },
  sliderImg: {
    width: '90%',
    height: '90%',
    resizeMode: 'contain',
    // backgroundColor: 'red'
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
  headerProjectName: {
    color: '#9b8264',
    marginTop: 10,
  },
  tagsStyles: {
    p: {
      marginBottom: 0,
      lineHeight: 15,
    },
  },
  tagsLeftStyles: {
    p: {
      marginBottom: 0,
      lineHeight: 15,
      textAlign: 'center'
    },
  },
  rightBtn: {
    position: 'absolute',
    top: '50%',
    right: 20,
    // backgroundColor: '#F2F5FA',
    // width: 30,
    // height: 30,
    // borderRadius: 5,
    // alignItems: 'center',
    // justifyContent: 'center'
  },
})
