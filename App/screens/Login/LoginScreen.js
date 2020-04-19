import styles from './styles';
import React, { Component } from 'react';
import {KeyboardAvoidingView, Platform } from 'react-native';
import LoginForm from "../../components/LoginForm";


class LoginScreen extends Component {

    static navigationOptions = {
        header: null
      };

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
