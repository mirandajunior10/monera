import { StyleSheet } from "react-native";

const primaryGreen = "#00CC99";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  inputContainer: {
    marginBottom: 20,
    width: "90%"
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
  resetButton: {
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
  backToLoginButtonContainer: {
    marginTop: 20
  },
  backToLoginTitle: {
    color: primaryGreen,
    fontSize: 18,
  },
});

export default styles;