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
        alignSelf: "center",
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
    saldo: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#8492A6'
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
    saldoPositivo: {
        color: primaryGreen,
    },
    saldoNegativo: {
        color: primaryRed,
    },
    transacoesContainer: {
        width: '100%',
        height: windowHeight,
        marginTop: '5%',
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
    itensContainer: {
        padding: 10,
        borderWidth: 0,
        marginBottom: 10,
        margin: 5,
        backgroundColor: '#fff',
        elevation: 5,
        borderRadius: 5,
        flexDirection: 'column'
    },
    textStyle: {
        fontSize: 18,
    },
    swipeButton: {
        backgroundColor: '#fff',
        padding: 0,
        borderRadius: 5,
        flex: 1
    },
    transacoesContainer: {
        height: '90%',
        marginTop: '5%',
        backgroundColor: 'white',
        padding: 0
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
        marginLeft: -10,
    },
    precoMedio: {
        color: primaryBlue,
        borderBottomColor: primaryBlue,
    },
    overlayContainer: { 
        backgroundColor: 'rgba(0, 0, 0, 0.25)', 
        alignItems: 'center', 
        fontSize: 20,
    },
    overlayWrapper: {
        height: 400,
        width: 250,
        borderRadius: 8,
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
        marginTop: '3%',
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
      },
    cardStyle: {
        elevation: 1
    },
});

export default styles;
