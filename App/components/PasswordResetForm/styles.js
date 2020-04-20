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
  backToLoginButtonContainer: {
    width: imageWidth,
    marginTop: 20
  },
  backToLoginTitle: {
    color: "#00C79C"
  },
  loginButtonContainer: {
    width: imageWidth
  },
  loginButton: {
    backgroundColor: "#FBE158",
    marginTop: 50
  },
  loginButtonTitle: {
    color: "white"
  },
  disabled: {
    backgroundColor: "#FBE158",
    opacity: 0.5
  },
  inputContainer: {
    marginBottom: 20,
    width: "90%"
  }
});

export default styles;