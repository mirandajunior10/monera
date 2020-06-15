import { StyleSheet, StatusBar, Dimensions, I18nManager } from 'react-native';
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
        marginLeft: 5,
        alignContent: "center"
    },
    titleHeader: {
        flex: 1,
        marginRight: "15%",
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
        flex: 1
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
        color: '#8492A6',
    },
    actionButtonIcon: {
        fontSize: 20,
        height: 22,
        color: 'white',
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
    titleOverlay: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 5,
        marginBottom: 20,
        alignSelf: 'center'
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
    buttonContainer: {
        marginTop: '8%',
        flexDirection: 'row',
        alignSelf: 'flex-end',
        alignContent: 'center'
    },
    overlayButton: {
        backgroundColor: 'rgba(0, 0, 0, 0)',
    },
    buttonTitle: {
        fontSize: 18,
    },
    emptyList: {
        alignSelf: "center",
        marginVertical: '50%',
        color: '#BEBEBE'
    },
    overlayButton: {
        backgroundColor: 'rgba(0, 0, 0, 0)',
    },
    buttonTitle: {
        fontSize: 18,
    },
    actionIcon: {
        width: 30,
        marginHorizontal: 10,
        marginRight: 5
    },
    rightAction: {
        marginLeft: 5,
        alignItems: 'center',
        flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
        backgroundColor: '#dd2c00',
        justifyContent: 'flex-end'
    },
});

export default styles;
