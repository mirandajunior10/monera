import { StyleSheet, StatusBar } from 'react-native';
import Autocomplete from 'react-native-autocomplete-input';

const primaryGreen = "#00CC99"
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
    marginLeft: '5%'
  },
  qrcode: {
    color: primaryGreen,
    fontSize: 40,
    marginRight: '5%'
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
    width: '90%',
    marginTop: '5%',
    alignItems: "center",
    alignSelf: "center",
  },
  saldoContainer: {
    width: 350,
    alignItems: 'center',
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
  valorContainer: {
    margin: '5%',
    width: "100%",
    alignItems: "center",
  },
  valorInput: {
    width: 100,
    paddingLeft: 10,
    padding: 5,
    fontSize: 20,
    color: '#333',
    textAlign: "center",
    borderBottomWidth: 1,
    borderColor: "#DCDCDC",
  },
  formContainer: {
    width: "100%",
  },
  inputTitle: {
    fontSize: 18,
    marginTop: '1%',
    color: "#8492A6",
  },
  inputText: {
    paddingLeft: 10,
    padding: 5,
    fontSize: 18,
    color: '#333',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#DCDCDC",
  },
  button: {
    backgroundColor: primaryGreen,
    padding: 10,
    borderRadius: 8,
    width: '100%',
  },
  buttonTitle: {
    color: "#FFF",
    fontSize: 18
  },
  buttonContainer: {
    width: 300,
    marginTop: '10%',
  },
  disabled: {
    backgroundColor: primaryGreen,
    opacity: 0.5,
  },
});

export default styles;

