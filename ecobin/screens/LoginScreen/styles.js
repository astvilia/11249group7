import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000000',
        alignItems: 'center',
        justifyContent: 'center',
    },

    title: {
        fontSize: 40,
        fontWeight: 'bold',
        color: 'white',
    },
  
    buttonContainer: {
        flexDirection: 'row',
    },
  
    image: {
        flex: 0.5,
        resizeMode: 'contain',
        margin: 40,
    },
  
    inputView: {
        backgroundColor: '#000000',
        borderRadius: 30,
        borderWidth: 1,
        borderColor: '#1a714f',
        width: '70%',
        height: 45,
        marginBottom: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
  
    TextInput: {
        color: 'white',
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
        borderWidth: 1,
        borderColor: '#777777',
        height: 50,
        width: 125,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        marginRight: 20,
        marginLeft: 20,
        backgroundColor: '#1a714f',
    },
  
    loginText: {
        color: 'white',
    },
  })

  export default styles