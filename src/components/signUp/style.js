import { StyleSheet } from 'react-native';

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'top',
    backgroundColor: 'white',
  },

  topContainer: {
    width : '100%',
    height : '25%',
    backgroundColor : '#2856ad',
    justifyContent : 'center'
  },
  title : {
    fontSize : 30,
    fontWeight : 'bold',
    alignSelf : 'center',
    textAlign : 'center',
    color : 'white'
  },

  header: {
    fontSize: 30,
    fontWeight: '700',
    marginHorizontal: 16,
    marginVertical: 8,
    color: '#2856ad',
    alignSelf: 'flex-start'
  },
  subheader: {
    fontSize: 15,
    fontWeight: '500',
    color: '#333',
    alignSelf: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 50
  },

  logo: {
    width: 250,
    height: 250,
    resizeMode: 'contain'
  },
  signupView: {
    width: '90%',
    marginHorizontal: 16,
    marginTop: 30,
    borderRadius: 10,
    alignContent : 'center',
  },
  input: {
    marginTop: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#333',
    marginHorizontal: 16,
    backgroundColor: '#f9f9f9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  button: {
    width: '80%',
    backgroundColor: '#6a1b9a',
    paddingVertical: 12,
    borderRadius: 5,
    alignSelf: 'center',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
     marginTop: 20,
     marginBottom: 30
  },
  loginText: {
    fontSize: 16,
    color: '#4a90e2',
    textDecorationLine : 'underline',
    fontWeight: '600',
    alignSelf: 'center',
  },

  signbutton: {
    width: '90%',
    backgroundColor: '#2856ad',
    paddingVertical: 12,
    borderRadius: 5,
    alignSelf: 'center',
    marginTop: 30,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    color: '#fdfefe',
    alignSelf: 'center',
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 100,
  },
  loadingText: {
    color: '#fff',
    marginTop: 10,
    fontSize: 16,
  },
  modalOverlay: {
    height: "100%",
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContent: {
    width: '85%',
    height: '28%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    paddingHorizontal: 15,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 28,
    fontWeight: '600',
    color: '#ff4d4d',
    marginBottom: 30,
  },
  modalText: {
    fontSize: 18,
    color: '#333',
    textAlign: 'center',
    marginBottom: 40,
  },
});
