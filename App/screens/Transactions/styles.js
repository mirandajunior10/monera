import { StyleSheet, Dimensions } from 'react-native';

const primaryColor = '#00C79C';

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;    

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        padding: 20,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 50,
    },
    titleHeader: {
        flex: 1,
    },
    title: {
        fontSize: 25,
        alignSelf: "center",
        fontWeight: 'bold',
        color: '#666666',
    },
    menu: {
        color: "#00C79C",
        fontSize: 40,
    },
    actionButtonIcon: {
        fontSize: 20,
        height: 22,
        color: 'white',
    },
    dialogInput: {
        borderBottomWidth: 1,
        borderColor: '#D4D4D4',
    },
    transacoes: {
        backgroundColor: 'white',
        marginTop: 50,
    },
    receita: {
        color: primaryColor,
        fontSize: 20
    },
    despesa: {
        color: '#FF6D6B',
        fontSize: 20,
    },
    data: {
        fontSize: 14,
        color: '#ccc'
    },
});

export default styles;
