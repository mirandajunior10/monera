import { Platform, StyleSheet, StatusBar } from "react-native";

const primaryBlue = Platform.select({
  ios: "#007aff", // rgb(0, 122, 255)
  android: "#2196f3" // rgb(33, 150, 243)
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: StatusBar.currentHeight,
  },
  registerButtonContainer: {
    width: 300,
    marginTop: '10%',
  },
  registerButton: {
    backgroundColor: "#FBE158",
    padding: 10
  },
  registerButtonTitle: {
    color: "white",
    fontSize: 18
  },
  loginButtonContainer: {
    width: 250,
    justifyContent: "center",
    color: "#00C79C",
    marginTop: '5%'
  },
  loginTitle: {
    color: "#00C79C",
  },
  disabled: {
    backgroundColor: "#FBE158",
    opacity: 0.3
  },
  inputContainer: {
    marginTop: '2%',
    width: 350,
  },
  logo: {
    width: 200,
    height: 200,
  },
  logoContainer: {
    marginTop: '15%',
    alignItems: 'center'
  },
  textLogo: {
    color: "#FBE158",
    fontSize: 50,
    fontWeight: "bold",
  }
});

export default styles;