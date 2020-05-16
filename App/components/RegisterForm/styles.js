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
    width: 250,
  },
  registerButton: {
    backgroundColor: "#FBE158",
    marginTop: 50,
  },
  registerButtonTitle: {
    color: "white",
  },
  disabled: {
    backgroundColor: "#FBE158",
    opacity: 0.3
  },
  inputContainer: {
    marginTop: 10,
    width: 350,
  },
  logo: {
    width: 150,
    height: 150,
  },
  textLogo: {
    color: "#FBE158",
    fontSize: 50,
    fontWeight: "bold",
    marginBottom: 50,
  }
});

export default styles;