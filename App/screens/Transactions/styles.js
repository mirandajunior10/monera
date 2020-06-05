import { StyleSheet, StatusBar, Dimensions } from 'react-native';
const windowHeight = Dimensions.get('window').height;

const primaryGreen = '#00C79C'; 
const primaryRed = '#FF6D6B'; 

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: StatusBar.currentHeight + 15,
    },
    menu: {
        color: primaryGreen,
        fontSize: 40,
        marginLeft: '5%'
    },
    titleHeader: {
        flex: 1,
        marginRight: "15%",
    },
    title: {
        fontSize: 25,
        alignSelf: "center",
        fontWeight: 'bold',
        color: '#47525E',
    },
    content: {
        width: '90%',
        marginTop: '10%',
        alignItems: "center",
        alignSelf: "center"
    },
    saldoPositivo: {
        fontSize: 25,
        alignSelf: "center",
        fontWeight: 'bold',
        color: primaryGreen,
        marginBottom: '5%',
    },
    saldoNegativo: {
        fontSize: 25,
        alignSelf: "center",
        fontWeight: 'bold',
        color: primaryRed,
        marginBottom: '5%',
    },
    transacoes: {
        backgroundColor: 'white',
        padding: 0
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
    receita: {
        color: primaryGreen,
        fontSize: 20,
        borderBottomWidth: 1,
        borderBottomColor: primaryGreen,
    },
    despesa: {
        color: primaryRed,
        fontSize: 20,
        borderBottomWidth: 1,
        borderBottomColor: primaryRed,
    },
    data: {
        fontSize: 14,
        color: '#ccc'
    },
});

export default styles;
