import styles from './styles';
import React, { Component } from 'react';
import { KeyboardAvoidingView } from 'react-native';
import PasswordResetForm from "../../components/PasswordResetForm";

class PasswordResetScreen extends Component {
    static navigationOptions = {
        header: null
      };

    render() {
        return (
            <KeyboardAvoidingView style={styles.container}>
                <PasswordResetForm navigation={this.props.navigation} />
            </KeyboardAvoidingView>
        );
    }
}

export default PasswordResetScreen;
