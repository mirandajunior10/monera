import styles from './styles';
import React, { Component } from 'react';
import { Icon } from "react-native-elements";
import { Text, View } from 'react-native';
class HomeScreen extends Component {
  
    static navigationOptions = ({ navigation }) => ({
        headerTitle: "Home",
        headerTintColor: "white",
        headerStyle: {
          backgroundColor: '#26c877'
        },
        labelStyle: {
          color: 'white',
        },
        headerLeft: Platform.select({
          ios: null,
          android: (
            <Icon
              name="md-menu"
              type="ionicon"
              color="white"
              containerStyle={styles.icon}
              onPress={() => navigation.toggleDrawer()}
            />
          )
        })
      });

    render() {
        return (
            <View style={styles.container}>
                <Text>Esta é a tela principal.</Text>
            </View>
        );
    }
}

export default HomeScreen;
