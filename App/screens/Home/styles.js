import { StyleSheet, Dimensions } from 'react-native';

const primaryColor = '#00C79C';
const {screenWidth, screenHeight} = Dimensions.get('window');

const styles = StyleSheet.create({
    
    container: {
        width: '100%',
        height: '100%',
        marginTop: 10,
        backgroundColor: "white",
    },
    header: {
        marginTop: 20,
        padding: 20,
        flexDirection: "row",
        alignItems: "center",
    },
    fontHeader: {
        color: "#666666",
        fontSize: 25,
        fontWeight: 'bold',
        marginLeft: '20%'
    },
    menu: {
        color: "#00C79C",
        fontSize: 40,
    },
    icon: {
      paddingLeft: 20,
    },
    flatList: {
        width: 150,
        backgroundColor: "#fcfcfc",
        borderRadius: 15,
    },
    icon: {
        paddingLeft: 20
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
    },
    autocompleteContainer: {
      //backgroundColor: '#ffffff',
      //borderWidth: 0.5,
      width:'auto'
    },
    overlay: {
        flex: 1,
        left: 0,
        position: 'absolute',
        right: 0,
        top: 0,
        zIndex: 1
    }
});
export default styles;
