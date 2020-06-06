import styles from './styles';
import React, { Component } from 'react';
import LoginForm from "../../components/LoginForm";


class LoginScreen extends Component {

  static navigationOptions = {
    header: null
  };


  render() {
    return (
      
          <LoginForm navigation={this.props.navigation} />
       
    );
  }
}

export default LoginScreen;
