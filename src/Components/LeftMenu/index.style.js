import { Dimensions, StyleSheet } from 'react-native'
const width = Dimensions.get('window').width

export const sideMenuStyles = StyleSheet.create({
  side: {
    // flex: 1,
    backgroundColor: '#f2f2f2',
    alignItems: 'center',
    paddingTop: 50,
    paddingHorizontal: 15,
    width: width * 0.25,
    height: '100%',
  },
  title: {
    color: '#555555',
    fontWeight: '500',
    textTransform: 'uppercase',
    fontSize: 20,
    minWidth: 200,
    textAlign: 'center',
    flexWrap: 'wrap',
    fontFamily: 'NoeDisplay-Medium',
  },
  menuLink: {
    marginTop: 15,
  },
  menuLinkText: {
    color: '#278590',
    fontWeight: '400',
    textTransform: 'uppercase',
    fontSize: 16,
    textAlign: 'center',
    fontFamily: 'NoeDisplay-Medium',
    lineHeight: 20
    // backgroundColor: 'red',
    // minWidth: 200
  },
  planNameBox: {
    // justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25,
  },
  planNameTitle: {
    marginBottom: 10,
  },
})
