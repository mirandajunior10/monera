import styles from './styles';
import React, { Component } from 'react';
import { Text, View, ActivityIndicator  } from 'react-native';

class LoadingScreen extends Component {

    componentDidMount = () => {
        setTimeout(() => {
          this.props.navigation.navigate("LoginScreen");
        }, 2000);
      }

    render() {
        return (
            <View style={styles.container}>
                <Text style={{ paddingBottom: 20 }}>Carregando</Text>
                <ActivityIndicator size="large" />
            </View>
        );
    }
}

export default LoadingScreen;
