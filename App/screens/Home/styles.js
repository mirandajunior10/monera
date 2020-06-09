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
        height: 370,
        width: 280,
        borderRadius: 8,
        paddingBottom: 0,
        alignItems: 'center', 
    },
    overlayWrapperAcao: {
        height: 430,
    },
    titleOverlay: {
        fontSize: 20,
        fontWeight: 'bold',
        color: primaryBlue,
        marginTop: 5,
        marginBottom: 20,
        alignSelf: 'center'
    },
    titleOverlay2: {
        color: primaryBlue,
    },
    inputContainer: {
        borderRadius: 8,
        width: 220,
        paddingLeft: 10,
        paddingRight: 10,
    },
    inputTitle: {
        fontSize: 16,
        marginTop: '5%',
        color: "#8492A6",
        alignSelf: 'baseline',
        marginLeft: 10
      },
      inputTitle2: {
        marginLeft: 0
      },
    inputText: {
        width: 220,
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
    buttonContainer: {
        marginTop: '8%',
        flexDirection: 'row',
        alignSelf: 'flex-end',
        alignItems: 'center'
    },
    overlayButton: {
        backgroundColor: 'rgba(0, 0, 0, 0)',
        marginTop: '5%'
    },
    buttonTitle: {
        fontSize: 18,
    },
    buttonTitle2:{
        color: primaryBlue,
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
