import { StyleSheet, StatusBar, Dimensions } from 'react-native';
const windowHeight = Dimensions.get('window').height;

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
    saldoContainer: {
        width: 350,
        alignItems: 'center',
        alignSelf: "center",
        borderWidth: 1,
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    containerNegativo: {
        borderColor: primaryRed,
    },
    containerPositivo: {
        borderColor: primaryGreen,
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
        height: windowHeight,
        marginTop: '5%',
        backgroundColor: 'white',
        padding: 0
    },
    textStyle: {
        fontSize: 18,
        borderBottomWidth: 1,
        marginLeft: -10,
    },
    actionButtonIcon: {
        fontSize: 20,
        height: 22,
        color: 'white',
    },
    dialogInput: {
        paddingLeft: 10,
        padding: 5,
        fontSize: 18,
        color: '#333',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#DCDCDC",
    },
    receita: {
        color: primaryGreen,
        borderBottomColor: primaryGreen,
    },
    despesa: {
        color: primaryRed,
        borderBottomColor: primaryRed,
    },
    data: {
        fontSize: 14,
        color: '#ccc',
        marginLeft: -10,
    },
    overlayContainer: {
        backgroundColor: 'rgba(0, 0, 0, 0.25)',
        alignItems: 'center',
        fontSize: 20
    },
    overlayWrapper: {
        height: 300,
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
      
    overlayButton: {
        backgroundColor: 'rgba(0, 0, 0, 0)',
        marginRight: 10,
    },
    buttonTitle: {
        color: primaryGreen,
        fontSize: 18,
    },
});

export default styles;
