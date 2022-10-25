import { Dimensions, StyleSheet } from 'react-native'
const width = Dimensions.get('window').width

export const detailsStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingBottom: 30,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    marginBottom: 20,
  },
  headerTitle: {
    fontWeight: '600',
    fontSize: 25,
  },
  body: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 5,
  },
  sliderBox: {
    flex: 3,
    // backgroundColor: 'blue',
    width: (width * 2) / 3,
  },
  content: {
    flex: 2,
    paddingHorizontal: 10,
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
  typeBtn: {
    backgroundColor: '#9b8264',
    width: '30%',
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
  },
})
