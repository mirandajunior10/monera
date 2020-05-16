
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
    marginTop: 20
  },
  forgottenPasswordTitle: {
    color: "#00C79C"
  },
  loginButtonContainer: {
    width: 250,
  },
  loginButton: {
    marginTop: 50,
    backgroundColor: "#FBE158"
  },
  loginButtonTitle: {
    color: "white"
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
    marginTop: 80,
    width: 150,
    height: 150,
  },
  textLogo: {
    color: "#FBE158",
    fontSize: 50,
    fontWeight: "bold",
    marginBottom: 50,
  },
  textInputContainer: {
    padding: 5,
    alignSelf: "baseline",
    width: "100%",
  },
  inputTitle: {
    fontSize: 20,
    marginTop: 10,
    color: "#8492A6"
  },
  inputText: {
    borderBottomWidth: 1,
    borderColor: "#DCDCDC",
    padding:5,
    fontSize: 20,
    color: '#333',
    borderRadius: 5,
  }
});

export default styles;