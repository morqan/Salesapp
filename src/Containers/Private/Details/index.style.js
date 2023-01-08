import { Dimensions, StyleSheet } from 'react-native'
const width = Dimensions.get('window').width

export const detailsStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // paddingBottom: 30,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 10,
    marginBottom: 20,
  },
  headerTitle: {
    fontWeight: '600',
    fontSize: 25,
  },
  body: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
  },
  sliderBox: {
    // flex: 1,
    // backgroundColor: 'blue',
    // width: (width * 2) / 3,
  },
  content: {
    flex: 1,
    paddingRight: 10,
    paddingLeft: 15,
    // backgroundColor: 'red'
  },
  contentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  contentHeaderText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#9b8264',
  },
  btnBox: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    // width: '100%',
    // backgroundColor: 'red'
  },
  typeBtn: {
    backgroundColor: '#9b8264',
    // flex: 1,
    margin: 5,
  },
  typeBtnText: {
    color: '#fff',
  },
  contentText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#000',
    lineHeight: 25,
  },
  sliderImg: {
    width: '100%',
    height: '100%',
    // resizeMode: 'stretch',
  },
  tagsStyles: {
    p: {
      marginBottom: 0,
      lineHeight: 30,
    },
  },
  tagsStylesPyc: {
    p: {
      marginBottom: 0,
      lineHeight: 30,
    },
  },
  tagsStylesMontenegro: {
    p: {
      marginBottom: 0,
      lineHeight: 25,
    },
  },
  videoIconBox: {
    borderWidth: 2,
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    borderColor: '#9b8264',
    marginLeft: 10
  },
  videoBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
})
