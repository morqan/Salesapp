import { StyleSheet } from 'react-native'

export const sideMenuStyles = StyleSheet.create({
  side: {
    // flex: 1,
    backgroundColor: '#F2F2F2',
    alignItems: 'center',
    paddingTop: 50,
    paddingHorizontal: 15
  },
  title: {
    color: '#555555',
    fontWeight: '500',
    textTransform: 'uppercase',
    fontSize: 25,
  },
  menuLink: {
    marginTop: 25,
  },
  menuLinkText: {
    color: '#278590',
    fontWeight: '500',
    textTransform: 'uppercase',
    fontSize: 20,
  },
  planNameBox: {
    // justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25
  },
  planNameTitle: {
    marginBottom: 10

  }
})
