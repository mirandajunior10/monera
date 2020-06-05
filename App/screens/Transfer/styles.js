import { StyleSheet, StatusBar, Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: StatusBar.currentHeight + 15,
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
    padding: 5,
    width: 350,
  },
  textInputContainer: {
    padding: 5,
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
    padding: 5,
    fontSize: 18,
    color: '#333',
    borderRadius: 5,
  },
  button: {
    backgroundColor: "#00CC99",
    padding: 10
  },
  transferButtonTitle: {
    color: "#FDFDFD",
    fontSize: 18
  },
  textInputContainer: {
    padding: 5,
    width: "100%",
  },
  inner: {
    justifyContent: "center",
    flex: 1,
  },
  transferButtonContainer: {
    width: 300,
    marginTop: '10%',
  },
  disabled: {
    backgroundColor: "#00CC99",
    opacity: 0.5
  },
});

export default styles;

