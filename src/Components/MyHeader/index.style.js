import { StyleSheet } from 'react-native'

export const headerStyles = StyleSheet.create({
  headerBox: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '10%',
  },
  logoBtn: {
    paddingLeft: 15,
    paddingRight: 20,
    backgroundColor: '#278590',
    // height: '100%',
    justifyContent: 'center',
  },
  linkBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    height: '100%',
  },
  linkBtn: {
    color: '#278590',
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 16,
    textTransform: 'uppercase',
    paddingLeft: 50,
    fontFamily: 'GothamPro',
  },
  logoutBtn: {
    backgroundColor: '#555555',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 25,
    // height: '100%',
  },
  backBtn: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 15,
    height: '100%',
  },
  rightBox: {
    height: '100%',
    backgroundColor: '#fff',
    flexDirection: 'row',
  },
})
