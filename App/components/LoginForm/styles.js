
import { StyleSheet, StatusBar } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: StatusBar.currentHeight,
  },
  forgottenPasswordButtonContainer: {
    width: 250,
    justifyContent: "center",
    marginTop: '5%'
  },
  forgottenPasswordTitle: {
    color: "#00C79C"
  },
  registerButtonContainer: {
    width: 250,
    justifyContent: "center",
  },
  registerTitle: {
    color: "#00C79C"
  },
  loginButtonContainer: {
    width: 300,
    marginTop: '10%',
  },
  loginButton: {
    backgroundColor: "#FBE158",
    padding: 10
  },
  loginButtonTitle: {
    color: "white",
    fontSize: 18
  },
  disabled: {
    backgroundColor: "#FBE158",
    opacity: 0.5
  },
  inputContainer: {
    marginTop: 25,
    width: 350,
  },
  logo: {
    width: 200,
    height: 200,
  },
  logoContainer: {
    alignItems: 'center'
  },
  textLogo: {
    color: "#FBE158",
    fontSize: 50,
    fontWeight: "bold",
  },
  textInputContainer: {
    padding: 5,
    alignSelf: "baseline",
    width: "100%",
  },
  inner: {
      flex: 1,
      alignItems: 'center',
    justifyContent: "center",
},
});

export default styles;