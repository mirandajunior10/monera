import styles from './styles';
import React, { Component } from 'react';
import LoginForm from "../../components/LoginForm";
import { auth } from '../../config/config';
import { View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";


class LoginScreen extends Component {

  static navigationOptions = {
    header: null
  };

  componentDidMount(){
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
      
          <LoginForm navigation={this.props.navigation} />
       
    );
  }
}

export default LoginScreen;
