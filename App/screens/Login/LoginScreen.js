import styles from './styles';
import React, { Component } from 'react';
import LoginForm from "../../components/LoginForm";
import { auth } from '../../config/config';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";


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
      <KeyboardAwareScrollView
                style={styles.container}
                resetScrollToCoords={{ x: 0, y: 0 }}
                contentContainerStyle={styles.container}
                scrollEnabled={false}
                >
          <LoginForm navigation={this.props.navigation} />
       
      </KeyboardAwareScrollView>
    );
  }
}

export default LoginScreen;
