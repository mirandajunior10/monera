import { StyleSheet, StatusBar, Dimensions } from 'react-native';
const windowHeight = Dimensions.get('window').height;

const primaryGreen = '#00C79C'
const primaryYellow = '#FBE158'
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
        marginRight: '15%',
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
        alignSelf: "center",
    }, 
    saldoContainer: {
        width: 350,
        alignItems: 'center',
        alignSelf: "center",
        borderWidth: 1,
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 20,
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
        color: '#8492A6'
    },
    saldoPositivo: {
        color: primaryGreen,
    },
    saldoNegativo: {
        color: primaryRed,
    },
    transacoesContainer: {
        width: '100%',
        marginTop: '5%',
        height: '90%',
    },
    itensContainer: {
        padding: 10,
        borderWidth: 0,
        marginBottom: 10,
        margin: 5,
        backgroundColor: '#fff',
        elevation: 5,
        borderRadius: 5,
    },
    itemTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderColor: '#CCC',
        marginTop: 5,
        marginBottom: 5,
    },
    itemBottom: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5,
    },
    textStyle: {
        fontSize: 18,
    },
    swipeButton: {
        backgroundColor: '#fff',
        padding: 0,
        borderRadius: 5,
    },
    ticker: {
        color: primaryBlue,
    },
    nomeEmpresa: {
        color: primaryBlue,
    },
    quantidade: {
        fontSize: 14,
        color: '#8492A6',
    },
    precoMedio: {
        color: primaryBlue,
        borderBottomColor: primaryBlue,
    },
    overlayContainer: { 
        backgroundColor: 'rgba(0, 0, 0, 0.25)', 
        alignItems: 'center', 
        fontSize: 20,
        flex: 1,
        width: '100%',
        height: '100%',
        position: 'absolute',
        alignItems: 'center'
    },
    overlayWrapper: {
        height: 430,
        width: 250,
        borderRadius: 8,
        paddingBottom: 0,
        alignItems: 'center', 
    },
    titleOverlay: {
        fontSize: 20,
        fontWeight: 'bold',
        color: primaryBlue,
        marginTop: 5,
        marginBottom: 20,
        alignSelf: 'center'
    },
    inputContainer: {
        borderRadius: 8,
        width: 200,
        paddingLeft: 10,
        paddingRight: 10,
    },
    inputTitle: {
        fontSize: 16,
        marginTop: '5%',
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
        borderColor: "#BEBEBE",
      },
    listAutocompleteStyle: {
        backgroundColor: '#FFF',
        elevation: 3,
        maxHeight: 200,
        borderRadius: 5,
        borderWidth: 0,
        width: '100%',
        paddingTop: 5,
        paddingLeft: 10,
        marginLeft: -2,
        paddingBottom: 5,
    },
    overlayButton: {
        backgroundColor: 'rgba(0, 0, 0, 0)',
        marginTop: '5%'
    },
    buttonTitle: {
        color: primaryBlue,
        fontSize: 18,
    },    
    autoCompleteView: {
        marginTop: 70,
        position: 'absolute',
        zIndex: 1
      },
      formContainer: {
          marginTop: 70
      },
      emptyList: {
        alignSelf: "center",
        marginVertical: '50%',
        color: '#BEBEBE'
    }
});

export default styles;
