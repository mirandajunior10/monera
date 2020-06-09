import { StyleSheet, StatusBar } from 'react-native';

const primaryGreen = "#00CC99"

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
        height: '100%',
        marginTop: '5%',
        alignSelf: "center"
    }
});

export default styles;
