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
    saldo: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#8492A6'
    },
    saldoContainer: {
        width: 350,
        alignItems: 'center',
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
    ticker: {
        color: primaryGreen,
        borderBottomColor: primaryGreen,
    },
    nomeEmpresa: {
        color: primaryGreen,
        borderBottomColor: primaryGreen,
    },
    data: {
        fontSize: 14,
        color: '#ccc',
        marginLeft: -10,
    },
    PM: {
        color: primaryGreen,
        borderBottomColor: primaryGreen,
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
        maxHeight: 200,
        position: 'absolute',
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
});

export default styles;
