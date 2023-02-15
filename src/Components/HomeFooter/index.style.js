import { StyleSheet } from 'react-native'

export const hfStyles = StyleSheet.create({
  container: {
    // flex: 1,
    // backgroundColor: 'red',
    paddingHorizontal: 30,
    flexDirection: 'row',
    paddingVertical: 25,
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  linkBox: {
    flexDirection: 'row',
    marginBottom: 10,
    alignItems: 'center',
    // backgroundColor: 'red',
    width: 180,
  },
  linkId: {
    backgroundColor: '#E2A13F',
    borderWidth: 3,
    borderColor: '#ddd',
    marginRight: 10,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  linkName: {
    fontSize: 12,
    fontWeight: '400',
    textTransform: 'uppercase',
    color: '#555555',
    width: 160,
    fontFamily: 'GothamPro',
    lineHeight: 15,
  },
  img: {
    width: 200,
    height: '46%',
    resizeMode: 'cover',
  },
})
