import styles from './styles';
import React, { Component } from 'react';
import { Icon } from "react-native-elements";
import { Text, View } from 'react-native';

class HomeScreen extends Component {
  
     navigationOptions = ({
        headerTitle: "Home",
        headerLeft: Platform.select({
          ios: null,
          android: (
            <Icon
              name="menu"
              type="material"
              containerStyle={styles.icon}
              onPress={() => props.toggleDrawer()}
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
