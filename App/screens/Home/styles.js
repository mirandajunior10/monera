import { StyleSheet, StatusBar  } from 'react-native';

const primaryGreen = '#00C79C'
const primaryRed = '#FF6D6B'
const primaryBlue = '#007bff'

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
        marginTop: '5%',
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
    carteiraSubtitle: {
        marginLeft: 5,
        color: '#8492A6',
        fontSize: 16,
        fontWeight: 'bold'
    },
    icon: {
      paddingLeft: 20,
    },
    acoes: {
        borderWidth: 1,
        borderRadius: 8,
        borderColor: primaryBlue,
        paddingRight: 5,
    },
    ticker: {
        color: primaryBlue,
        borderBottomColor: primaryBlue,
        fontSize: 16,
        marginLeft: -10
    },
    nomeEmpresa: {
        color: '#8492A6',
        borderBottomColor: primaryBlue,
        fontSize: 16,
    },
    quantidade: {
        fontSize: 14,
        color: '#8492A6',
        marginLeft: -10,
    },
    precoMedio: {
        color: primaryBlue,
        borderBottomColor: primaryBlue,
    },
    overlayContainer: { 
        backgroundColor: 'rgba(0, 0, 0, 0.3)', 
        alignItems: 'center', 
        fontSize: 20,
    },
    overlayWrapper: {
        height: 400,
        width: 250,
        borderRadius: 5,
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
        maxHeight: 200,
        borderRadius: 8,
        borderWidth: 0,
        width: '100%',
        paddingLeft: 10,
        marginLeft: -2,
        paddingBottom: 5,
    },
    overlayButton: {
        backgroundColor: 'rgba(0, 0, 0, 0)',
        marginTop: '5%'
    },
    buttonTitle: {
        color: primaryGreen,
        fontSize: 18,
    },
    disabled: {
        backgroundColor: primaryGreen,
        opacity: 0.5,
    },
    inputTitle: {
        fontSize: 18,
        marginTop: '1%',
        color: "#8492A6",
      },
    inputText: {
        width: 200,
        paddingLeft: 10,
        padding: 5,
        fontSize: 18,
        color: '#333',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#DCDCDC",
      },
      acaoContainer: {
        flex: 1,
        position: 'absolute',
        alignItems: 'center'
      },
      autoCompleteView: {
        marginTop: 50,
        position: 'absolute',
        zIndex: 1
      },
      formContainer: {
          marginTop: 75
      }
});
export default styles;
