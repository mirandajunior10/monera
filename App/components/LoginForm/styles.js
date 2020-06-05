
import { StyleSheet, StatusBar } from "react-native";

const primaryGreen = "#00CC99"
const primaryYellow = "#FBE158"

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: StatusBar.currentHeight,
  },
  formContainer: {
    width: "100%",
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
  loginButton: {
    backgroundColor: primaryGreen,
    padding: 10,
    borderRadius: 8,
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
  forgottenPasswordButtonContainer: {
    justifyContent: "center",
    marginTop: '5%'
  },
  forgottenPasswordTitle: {
    color: primaryGreen,
  },
  registerButtonContainer: {
    marginTop: "20%",
    justifyContent: "center",
  },
  registerTitle: {
    color: primaryGreen,
  },
  inner: {
      flex: 1,
      alignItems: 'center',
    justifyContent: "center",
  }
});

export default styles;