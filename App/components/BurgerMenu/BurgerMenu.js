import styles from "./styles";
import React, { PureComponent } from "react";
import { ScrollView, Image, Text } from "react-native";
import { Button } from "react-native-elements";
import { auth, database } from '../../config/config';
import { SafeAreaView, withNavigation } from "react-navigation";
import BottomSheet from 'react-native-js-bottom-sheet'
import { DrawerItems } from 'react-navigation-drawer'
import { TouchableOpacity } from "react-native-gesture-handler";
import bottomSheetActions from './botomSheetActions'
import { handleImagePicker, handleOpenCamera } from "./functions";


class BurgerMenu extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      openCamera: false,
      imagePath: ''
    }
    this.bottomSheet = ''

  }

  async componentDidMount() {
    let snapshot = await (await database.ref('users/' + auth.currentUser.uid).once("value")).val();
    this.setState({ name: snapshot.nome, imagePath: snapshot.profilePic })
    console.log(this.state.imagePath)

  }
  _onPressButton = () => {
    this.bottomSheet.open()
  }

  signOut = async () => {
    await auth.signOut();
    this.props.navigation.navigate("LoginScreen");

  }

  render() {
    return (

      <SafeAreaView style={styles.container} forceInset={{ top: "always", horizontal: "never" }}>

        {/* Cabeçalho do Drawer */}
        <TouchableOpacity onPress={this._onPressButton}>
          <Image key={this.state.imagePath} source={{ uri: this.state.imagePath || "https://picsum.photos/300/300", width: 150, height: 150 }} style={styles.profilePic} ></Image>
        </TouchableOpacity>
        <Text style={{ alignSelf: 'center', color: 'white', fontSize: 15, fontWeight: 'bold' }}>Olá, {this.state.name}</Text>

        {/* Itens do drawer */}
        <ScrollView>
          <DrawerItems {...this.props} />
        </ScrollView>

        {/* Botão de Log out */}
        <Button
          icon={{ name: "md-log-out", type: "ionicon" }}
          title="Log out"
          iconContainerStyle={styles.icon}
          buttonStyle={styles.button}
          titleStyle={styles.title}
          onPress={this.signOut}
        />

        {/* Botoom Sheet ao clicar na imagem do perfil, para trocar de imagem */}
        <BottomSheet
          ref={(ref) => {
            this.bottomSheet = ref
          }}
          backButtonEnabled={true}
          coverScreen={true}
          options={[
            {
              ...bottomSheetActions[0],
              onPress: () => { handleImagePicker(this) }
            }
            ,
            {
              ...bottomSheetActions[1],
              onPress: () => { handleOpenCamera(this) }
            }

          ]}
          isOpen={false}
        />
      </SafeAreaView>
    );
  }
}

export default withNavigation(BurgerMenu);