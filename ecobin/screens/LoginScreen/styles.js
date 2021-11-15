import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center',
    },
  
    buttonContainer: {
        flexDirection: 'row',
    },
  
    image: {
        flex: 0.5,
        resizeMode: 'contain',
        marginBottom: 80,
    },
  
    inputView: {
        backgroundColor: '#FFFFFF',
        borderRadius: 30,
        borderWidth: 2,
        borderColor: '#000000',
        width: '70%',
        height: 45,
        marginBottom: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
  
    TextInput: {
        color: 'black',
        height: 50,
        flex: 0.8,
        padding: 10,
    },
  
    forgot_button: {
        height: 30,
        marginBottom: 30,
        color: '#0645AD',
    },
  
    loginBtn: {
        borderRadius: 100,
        borderWidth: 2,
        borderColor: 'black',
        height: 50,
        width: 125,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        marginRight: 20,
        marginLeft: 20,
        backgroundColor: '#228B22',
    },
  
    loginText: {
        color: 'white',
    },
  })

  export default styles