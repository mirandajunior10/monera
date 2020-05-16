import styles from './styles';
import React, { Component } from 'react';
import { View, ActivityIndicator  } from 'react-native';

class LoadingScreen extends Component {

    componentDidMount = () => {
        setTimeout(() => {
          this.props.navigation.navigate("LoginScreen");
        }, 2000);
      }

    render() {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" />
            </View>
        );
    }
}

export default LoadingScreen;
