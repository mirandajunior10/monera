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
    overlayContainer: { 
        backgroundColor: 'rgba(0, 0, 0, 0.25)', 
        alignItems: 'center', 
        fontSize: 20
    },
    overlayWrapper: {
        height: 160,
        width: 250,
        borderRadius: 8,
        justifyContent: "center",
        paddingBottom: 0,
    },
    titleNovaOrdem: {
        fontSize: 20,
        color: primaryGreen,
        margin: 10,
    },
    inputContainer: {
        borderRadius: 8,
        width: 200,
        paddingLeft: 10,
        paddingRight: 10,
    },
    listAutocompleteStyle: {
        backgroundColor: '#FFF',
        elevation: 2,
        borderRadius: 8,
        borderWidth: 0,
        width: '100%',
        paddingLeft: 10,
        marginLeft: -2,
        marginTop: 5,
    },
    overlayButton: {
        backgroundColor: 'rgba(0, 0, 0, 0)',
        marginRight: 10,
    },
    buttonTitle: {
        color: primaryGreen,
        fontSize: 18,
    },
    disabled: {
        backgroundColor: primaryGreen,
        opacity: 0.5,
    },
});
export default styles;
