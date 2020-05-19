import { StyleSheet, StatusBar, Dimensions } from 'react-native';
const windowHeight = Dimensions.get('window').height;
const windowsWidth = Dimensions.get('window').width;
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
      color: "#00C79C",
      fontSize: 40,
      marginLeft: 20,
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
        marginTop: '10%',
    }
});

export default styles;
