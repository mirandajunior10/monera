import { StyleSheet, StatusBar  } from 'react-native';

const primaryGreen = '#00C79C'
const primaryRed = '#FF6D6B'

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
        marginRight: "10%",
    },
    title: {
        fontSize: 25,
        textAlign: "center",
        fontWeight: 'bold',
        color: '#47525E',
    },
    content: {
        width: '90%',
        marginTop: '10%',
        alignSelf: "center"
    },
    resumoTitle: {
        marginTop: '10%',
        fontSize: 20,
        color: '#47525E',
        marginLeft: 5,
    },
    resumoContainer: {
        width: 360,
        borderWidth: 1,
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    saldoContainer: {
       borderBottomWidth: 1 
    },
    containerPositivo: {
        borderColor: primaryGreen,
    },
    containerNegativo: {
        borderColor: primaryRed,
    },
    saldo: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#8492A6',
        marginBottom: 5,
    },
    saldoPositivo: {
        color: primaryGreen,
    },
    saldoNegativo: {
        color: primaryRed,
    },
    carteiraTitle: {
        marginTop: '10%',
        fontSize: 20,
        color: '#47525E',
        marginLeft: 5,
    },
    icon: {
      paddingLeft: 20,
    },
    acoes: {
        borderWidth: 1,
        borderRadius: 8,
        borderColor: primaryRed,
    },
    ticker: {
        color: primaryGreen
    },
    PM: {
        color: primaryGreen
    },
    nomeEmpresa: {
        color: primaryGreen
    },
    autocompleteContainer: {
      //backgroundColor: '#ffffff',
      //borderWidth: 0.5,
      width:'auto'
    },
    overlay: {
        flex: 1,
        left: 0,
        position: 'absolute',
        right: 0,
        top: 0,
        zIndex: 1
    },
});
export default styles;
