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
    paddingHorizontal: 15,
    backgroundColor: '#278590',
    height: '100%',
    justifyContent: 'center',
  },
  linkBox: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 50,
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
  },
  logoutBtn: {
    backgroundColor: '#555555',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
    height: '100%',
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
