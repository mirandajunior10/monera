import { StyleSheet, StatusBar, Dimensions } from 'react-native';
const windowHeight = Dimensions.get('window').height;

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
        color: primaryBlue,
        fontSize: 40,
        marginLeft: '5%'
    },
    titleHeader: {
        flex: 1,
        marginRight: '15%',
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
        alignSelf: "center",
    },
    posicaoContainer: {
        width: 350,
        alignItems: 'center',
        alignSelf: "center",
        borderWidth: 1,
        borderColor: primaryBlue,
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    saldo: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#8492A6'
    },
    valor: {
        color: primaryBlue,
    },
    transacoesContainer: {
        width: '100%',
        marginTop: '5%',
        height: '90%',
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
        flex: 1,
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
    data: {
        fontSize: 14,
        color: '#ccc',
    },
    actionButtonIcon: {
        fontSize: 20,
        height: 22,
        color: 'white',
    },
    overlayContainer: {
        backgroundColor: 'rgba(0, 0, 0, 0.25)',
        alignItems: 'center',
    },
    overlayWrapper: {
        height: 360,
        width: 250,
        borderRadius: 5,
    },
    titleOverlay: {
        fontSize: 20,
        fontWeight: 'bold',
        color: primaryBlue,
        marginTop: 5,
        marginBottom: 20,
    },
    inputTitle: {
        fontSize: 16,
        marginTop: '5%',
        marginLeft: 5,
        color: "#8492A6",
        alignSelf: 'baseline'
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
        marginTop: 10,
        backgroundColor: 'rgba(0, 0, 0, 0)',
    },
    buttonTitle: {
        color: primaryBlue,
        fontSize: 18,
    },
});

export default styles;
