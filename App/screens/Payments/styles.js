import { StyleSheet, StatusBar, Dimensions } from 'react-native';

const widthtScreen = Dimensions.get('window').width
const heightScreen = Dimensions.get('window').height
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

const primaryGreen = '#00C79C'
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
    marginLeft: 5,
    alignContent: "center"
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
    height: '100%',
    marginTop: '5%',
    alignItems: "center"
  },
  saldoContainer: {
    width: 350,
    alignItems: 'center',
    alignSelf: "center",
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#666',
    paddingVertical: 10,
    paddingHorizontal: 20,
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
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '85%',
    marginTop: '15%',
  },
  inputText: {
    width: '90%',
    height: 40,
    paddingLeft: 10,
    padding: 5,
    fontSize: 18,
    color: '#333',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#DCDCDC",
  },
  iconInput: {
    fontSize: 25,
    color: primaryGreen,
    //alignSelf: 'auto',
    marginLeft: 10
  },
  barcodeScanner: {
    width: widthtScreen,
    flex: 1,
    height: '100%'
  },
  cancellButton: {
    width: widthtScreen,
    backgroundColor: primaryGreen,
    alignItems: 'center',
    padding: 15,
  },
  cancellContainer: {
    height: screenHeight
  },
  camera: {
    width: screenWidth,
    height: '75%',
    marginLeft: 0
  },
  containerNegativo: {
    borderColor: primaryRed,
  },
  containerPositivo: {
    borderColor: primaryGreen,
  },
});

export default styles;
