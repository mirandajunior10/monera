import { StyleSheet, StatusBar, Dimensions, useWindowDimensions  } from 'react-native';

const primaryGreen = '#00C79C';
const windowHeight = Dimensions.get('window').height;

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
        textAlign: "center",
        fontWeight: 'bold',
        color: '#47525E',
    },
    content: {
        width: '90%',
        marginTop: '10%',
        alignItems: "center",
        alignSelf: "center"
    },
    icon: {
      paddingLeft: 20,
    },
    acoes: {
        backgroundColor: 'white',
        marginTop: 50
    },
    ticker: {
        color: primaryGreen
    },
    PM: {
        color: primaryGreen
    },
    nomeEmpresa: {
        color: primaryGreen
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
