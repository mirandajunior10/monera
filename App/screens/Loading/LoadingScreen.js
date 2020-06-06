import styles from './styles';
import React, { Component } from 'react';
import { View, ActivityIndicator  } from 'react-native';
import { auth } from '../../config/config';

class LoadingScreen extends Component {

    

    componentDidMount(){
        auth.onAuthStateChanged(user => {
          if (user) {
            this.props.navigation.navigate("HomeScreen")
          } else {
            this.props.navigation.navigate("LoginScreen");
        }
        });
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
