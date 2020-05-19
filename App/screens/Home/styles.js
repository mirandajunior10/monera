import { StyleSheet, StatusBar, Dimensions, useWindowDimensions  } from 'react-native';

const primaryColor = '#00C79C';
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    
    container: {
        flex: 1,
        backgroundColor: "white",
        alignItems: 'center'
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: StatusBar.currentHeight + 15,
    },
    titleHeader: {
        flex: 1,
    },
    title: {
        fontSize: 25,
        alignSelf: "center",
        fontWeight: 'bold',
        color: '#47525E',
    },
    content: {
        marginTop: 50,
        height: windowHeight,
    },
    menu: {
        color: "#00C79C",
        fontSize: 40,
        marginLeft: 25,
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
    },
});
export default styles;
