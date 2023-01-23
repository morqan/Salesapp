import { StyleSheet } from 'react-native'

export const planStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backBtnBox: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    zIndex: 9999,
    width: 70,
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#278590'
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
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    // flex: 1,
    // backgroundColor: 'green',
  },
  slideBoxGallery: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    // flex: 1,
    backgroundColor: 'green',
  },
  sliderImg: {
    width: '100%',
    height: '100%',
    resizeMode: 'stretch',
    // backgroundColor: 'red'
  },
  sliderAbsoluteBox: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: '10%',
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
      lineHeight: 20,
      textAlign: 'center',
      fontFamily: 'GothamPro',
      fontSize: 18
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
