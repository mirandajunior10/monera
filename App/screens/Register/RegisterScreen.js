import styles from './styles';
import React, { Component } from 'react';
import { Text, View } from 'react-native';

class RegisterScreen extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>Essa é a tela de cadastro.</Text>
            </View>
        );
    }
}

export default RegisterScreen;
