import styles from "./styles";
import React, { PureComponent } from "react";
import { ScrollView } from "react-native";
import { Button } from "react-native-elements";
import { auth } from '../../config/config';

import {
  SafeAreaView,
  withNavigation
} from "react-navigation";

import {DrawerItems} from 'react-navigation-drawer'

class BurgerMenu extends PureComponent {
     signOut = async () => {
      await auth.signOut();
      this.props.navigation.navigate("LoginScreen");

    }

  render() {
    return (
      <SafeAreaView style={styles.container} forceInset={{ top: "always", horizontal: "never" }}>
        <ScrollView>
          <DrawerItems {...this.props} />
        </ScrollView>
        <Button
          icon={{ name: "md-log-out", type: "ionicon" }}
          title="Log out"
          iconContainerStyle={styles.icon}
          buttonStyle={styles.button}
          titleStyle={styles.title}
          onPress={this.signOut}
        />
      </SafeAreaView>
    );
  }
}

export default withNavigation(BurgerMenu);