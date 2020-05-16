import { StyleSheet, StatusBar, Dimensions } from 'react-native';
const windowHeight = Dimensions.get('window').height;

const primaryColor = '#00C79C';  

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: StatusBar.currentHeight,
    },
    titleHeader: {
        flex: 1,
    },
    title: {
        fontSize: 25,
        alignSelf: "center",
        fontWeight: 'bold',
        color: '#47525E',
    },
    saldo: {
        fontSize: 25,
        alignSelf: "center",
        fontWeight: 'bold',
        color: '#00C79C',
        marginBottom: 20,
    },
    menu: {
        color: "#00C79C",
        fontSize: 40,
    },
    content: {
        marginTop: 50,
        height: 550,
    },
    actionButtonIcon: {
        fontSize: 20,
        height: 22,
        color: 'white',
    },
    dialogInput: {
        borderBottomWidth: 1,
        borderColor: '#D4D4D4',
    },
    transacoes: {
        padding: 5,
    },
    receita: {
        color: primaryColor,
        fontSize: 20,
        borderBottomWidth: 1,
        borderBottomColor: "#D4D4D4"
    },
    despesa: {
        color: '#FF6D6B',
        fontSize: 20,
        borderBottomWidth: 1,
        borderBottomColor: "#D4D4D4"
    },
    data: {
        fontSize: 14,
        color: '#ccc'
    },
});

export default styles;
