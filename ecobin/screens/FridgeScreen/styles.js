import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    addMenuView: {
        width: '100%',
        height: '30%',
        backgroundColor: "white",
        borderTopWidth: 1,
        borderColor: 'black',
        padding: 35,
        alignItems: "center",
        marginTop: 'auto',
    },
    button: {
        flex: 1,
        margin: 10,
        width: '90%',
        justifyContent: "center",
        borderRadius: 20,
        borderColor: 'black',
        borderWidth: 1,
        padding: 10,
        elevation: 2,
        backgroundColor: "#228B22",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center",
    }
})

export default styles