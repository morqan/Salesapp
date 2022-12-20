import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0d6a78',
    alignItems: 'center',
    justifyContent: 'center'
  },
  loginBox: {
    width: "55%",
    height: '65%',
    backgroundColor: '#fff',
  },
  logoBox: {
    alignItems: 'center',
    paddingVertical: 30,
  },
  logoText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 30,
  },
  form: {
    paddingHorizontal: 90,
    paddingTop: 10,
  },
  inputBox: {
    marginBottom: 30,
  },
  errText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 20,
    marginTop: 50,
  },
  supportText: {
    color: '#1E1E1E',
    fontWeight: '400',
    textAlign: 'center',
    fontSize: 13,
    marginTop: 25,

  },
  loginBntContainer:{
    width: '100%',
    backgroundColor: '#278590',
    borderColor: '#278590',
  }
})
