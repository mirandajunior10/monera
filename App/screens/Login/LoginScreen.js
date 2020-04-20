import styles from './styles';
import React, { Component } from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';
import LoginForm from "../../components/LoginForm";
import { auth } from '../../config/config';


class LoginScreen extends Component {

  static navigationOptions = {
    header: null
  };

  UNSAFE_componentWillMount(){
    auth.onAuthStateChanged(user => {
      if (user) {
        this.props.navigation.navigate("HomeScreen")
      } else {
        this.setState({isLoggedIn: false})
      }
    });
  }
  render() {
    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <LoginForm navigation={this.props.navigation} />
      </KeyboardAvoidingView>
    );
  }
}

export default LoginScreen;
