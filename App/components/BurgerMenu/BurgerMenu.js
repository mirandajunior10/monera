import styles from "./styles";
import React, { PureComponent } from "react";
import { ScrollView, Image, Text } from "react-native";
import { Button } from "react-native-elements";
import { auth, database } from '../../config/config';



import {
  SafeAreaView,
  withNavigation
} from "react-navigation";

import { DrawerItems } from 'react-navigation-drawer'

class BurgerMenu extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      name: ''
    }
  }

  async componentDidMount() {
    let snapshot = await (await database.ref('users/' + auth.currentUser.uid + '/nome').once("value")).val();
    console.log(snapshot)
    this.setState({ name: snapshot })

  }


  signOut = async () => {
    await auth.signOut();
    this.props.navigation.navigate("LoginScreen");

  }

  render() {
    return (
      <SafeAreaView style={styles.container} forceInset={{ top: "always", horizontal: "never" }}>
        <Image source={{ uri: "https://picsum.photos/300/300", width: 150, height: 150 }} style={styles.profilePic}></Image>
        <Text style={{ alignSelf: 'center', color: 'white', fontSize: 15, fontWeight: 'bold' }}>Olá, {this.state.name}</Text>
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