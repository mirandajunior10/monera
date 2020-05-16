import { StyleSheet, StatusBar, Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
      flex: 1,
      padding: 20,
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      marginTop: StatusBar.currentHeight,
  },
  menu: {
    color: "#00C79C",
    fontSize: 40,
  },
  qrcode: {
    color: "#00C79C",
    fontSize: 40,
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
    marginTop: '15%',
    alignItems: "center",
    padding: 5
  },
    textInputContainer: {
      padding: 5,
      alignSelf: "baseline",
      width: "100%",
    },
    inputTitle: {
      fontSize: 20,
      marginTop: '2%',
      color: "#8492A6"
    },
    inputText: {
      borderBottomWidth: 1,
      borderColor: "#DCDCDC",
      padding:5,
      fontSize: 18,
      color: '#333',
      borderRadius: 5,
    },
    button: {
      backgroundColor: "#00CC99",
      width: 200,
      marginTop: '10%',
      padding: 15,
      borderRadius: 5,
      alignItems: "center",
    },
    buttonText: {
        color: '#FDFDFD',
        fontSize: 18
    },
  });

export default styles;

