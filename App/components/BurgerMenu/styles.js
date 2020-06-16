import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  icon: {
    marginHorizontal: 16,
    width: 24
  },
  button: {
    justifyContent: "flex-start",
    backgroundColor: "#FBE158"
  },
  title: {
    color: "black",
    margin: 10,
    fontSize: 16,
    fontWeight: "500"
  },
  profilePic:{
    marginTop: 15,
    borderRadius: 100,
    //alignContent: 'center',
    alignSelf: 'center',
   // alignItems: 'center'

  }
});

export default styles;