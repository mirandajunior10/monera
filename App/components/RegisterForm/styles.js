import { StyleSheet, StatusBar } from "react-native";

const primaryGreen = "#00CC99"
const primaryYellow = "#FBE158"

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: StatusBar.currentHeight,
  },
  logo: {
    width: 200,
    height: 200,
  },
  logoContainer: {
    alignItems: 'center',
    margin: 20,
  },
  textLogo: {
    color: primaryYellow,
    fontSize: 50,
    fontWeight: "bold",
  },
  inputText: {
    padding: 10,
    fontSize: 18,
    color: '#333',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#DCDCDC",
    width: 350,
    marginTop: 20,
  },
  buttonContainer: {
    width: 300,
    marginTop: '10%',
  },
  registerButton: {
    backgroundColor: primaryGreen,
    padding: 10,
    borderRadius: 8,
  },
  buttonTitle: {
    color: "white",
    fontSize: 18
  },
  loginButtonContainer: {
    justifyContent: "center",
    marginTop: '5%'
  },
  loginTitle: {
    color: primaryGreen,
  },
  disabled: {
    backgroundColor: primaryGreen,
    opacity: 0.3
  },
  inputContainer: {
    marginTop: '2%',
    width: 350,
  },
  inner: {
    flex: 1,
    alignItems: 'center',
  justifyContent: "center",
},
});

export default styles;