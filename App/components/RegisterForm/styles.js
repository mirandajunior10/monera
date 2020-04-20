import { Platform, StyleSheet } from "react-native";

const primaryBlue = Platform.select({
  ios: "#007aff", // rgb(0, 122, 255)
  android: "#2196f3" // rgb(33, 150, 243)
});

const imageWidth = "80%";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  registerButtonContainer: {
    width: imageWidth,
    marginTop: 20
  },
  registerButton: {
    backgroundColor: "#FBE158",
  },
  registerButtonTitle: {
    color: "white"
  },
  disabled: {
    backgroundColor: "#FBE158",
    opacity: 0.3
  },
  inputContainer: {
    marginBottom: 20,
    width: "90%"
  },
  logo: {
    width: 150,
    height: 150
  },
  textLogo: {
    color: "#FBE158",
    fontSize: 50,
    fontWeight: "bold",
    marginBottom: "10%"
  }
});

export default styles;