import { StyleSheet } from 'react-native';

const primaryColor = '#00C79C';

const styles = StyleSheet.create({
    
    container: {
        flex: 1,
        paddingTop: 100,
        alignItems: "center"
    },
    flatList: {
        width: 150,
        backgroundColor: "#fcfcfc",
        borderRadius: 15,
    },
    icon: {
        paddingLeft: 10
    },
    acoes: {
        backgroundColor: 'white',
        marginTop: 50
    },
    ticker: {
        color: primaryColor
    },
    PM: {
        color: primaryColor
    },
    nomeEmpresa: {
        color: primaryColor
    }
});
export default styles;
