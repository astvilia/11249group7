import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.8)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    exitButton: {
        alignSelf: 'flex-end',
        marginRight: 5,
        marginTop: 40,
    },
    myFridgeTitle: {
        alignSelf: 'flex-start',
        marginLeft: 20,
        marginBottom: 20,
        fontSize: 35,
        fontWeight: 'bold',
        color: 'white',
    },
    flatListStyle: {
        width: '90%',
        borderWidth: 3,
        borderRadius: 20,
        borderColor: 'black',
        backgroundColor: '#222222',
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    addMenuView: {
        width: '100%',
        height: '30%',
        backgroundColor: "black",
        padding: 20,
        alignItems: "center",
        marginTop: 'auto',
    },
    button: {
        margin: 10,
        width: '90%',
        justifyContent: "center",
        borderRadius: 20,
        borderColor: 'grey',
        borderWidth: 1,
        padding: 10,
        elevation: 2,
        backgroundColor: "#1a714f",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center",
    },
    centeredManualView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalManualView: {
        margin: 20,
        width: '80%',
        height: 'auto',
        backgroundColor: "black",
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'white',
        padding: 35,
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
    },
    inputView: {
        backgroundColor: 'black',
        borderRadius: 30,
        borderWidth: 2,
        borderColor: '#1a714f',
        width: '70%',
        height: 40,
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
    labelContainer: {
        width: '90%',
        flexDirection: 'row',
        marginTop: 10,
    },
})

export default styles