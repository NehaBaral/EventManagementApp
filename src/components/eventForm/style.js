import { StyleSheet } from 'react-native';

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'top',
    backgroundColor: 'white',
  },

  inputTitle: {
    marginHorizontal: '16',
    marginTop: '16',
    fontWeight: "500",
    fontSize: 16
  },

  input: {
    marginTop: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#333',
    marginHorizontal: 16,
    backgroundColor: '#f9f9f9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2
  },
  button: {
    width: '90%',
    backgroundColor: 'green',
    paddingVertical: 10,
    borderRadius: 5,
    alignSelf: 'center',
    marginTop : '20'
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
})