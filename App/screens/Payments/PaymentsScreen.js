import styles from './styles';
import React, { Component } from 'react';
import { Text, View, StyleSheet, TextInput } from 'react-native';
import { Button } from "react-native-elements";
import Icon from 'react-native-vector-icons/Ionicons';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { handleAction, handleDate, handleCancel } from "./functions";
import { TouchableOpacity } from 'react-native-gesture-handler';
import { database, auth } from '../../config/config';

class PaymentsScreen extends Component {

  static navigationOptions = ({ navigation }) => {
    return {
      headerLeft: (
        <Icon name="md-menu" style={styles.menu} onPress={() => navigation.toggleDrawer()} />
      ),
      title: 'Pagamentos',
      headerTitleStyle: styles.title,
    }

  };


  constructor(props) {
    super(props);
    this.state = {
      hasPermission: null,
      scanned: false,
      isLoggedIn: true
    };
  }

  _handleBarCodeScanned = (result) => {
    this.setState({ scanned: true, codigoDeBarras: result.data });
  };

  async getPermissions() {
    const { status } = await BarCodeScanner.requestPermissionsAsync();
    this.setState({ hasPermission: status === 'granted' })
  }

  async componentDidMount() {
    this.setState({ hasPermission: false })
    
    let that = this
    database.ref('users/' + auth.currentUser.uid + '/saldo').on("value", function (snapshot) {
      if(!auth.currentUser) return
     let saldo = snapshot.val()
     let saldoNumber = Number(saldo);

     
     that.setState({
       saldo: saldoNumber,
       saldoDisplay: saldoNumber.toFixed(2).replace('.', ',')
     })

   }, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
  })

  }

  render() {

    return (
      <View style={styles.container}>

        <View style={styles.content}>
          <View style={this.state.saldo >= 0 ? [styles.saldoContainer, styles.containerPositivo] : [styles.saldoContainer, styles.containerNegativo]} >
            <Text style={styles.saldo}>Saldo disponível:
              <Text style={this.state.saldo >= 0 ? styles.saldoPositivo : styles.saldoNegativo}> R$ {this.state.saldoDisplay}</Text>
            </Text>
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Digite o código de barras"
              value={this.state.codigoDeBarras}
              onChangeText={(text) => {this.setState({codigoDeBarras: text})}}
              keyboardType='number-pad'
              onChange={({ nativeEvent }) => this.setState({ descricao: nativeEvent.text })}
              autoFocus={false}
              onFocus={() => this.setState({ hasPermission: false })}
              onBlur={() => { this.setState({ hasPermission: false }) }}
              style={styles.inputText} />
            <Icon name="md-camera" style={styles.iconInput} onPress={() => this.getPermissions()} />
          </View>
          
          {
            this.state.scanned === false && this.state.hasPermission === true ?
              //Se o código de barras não tiver sido lido
              <View style={styles.barcodeScanner}>
                <BarCodeScanner
                  barCodeTypes={[BarCodeScanner.Constants.BarCodeType.itf14]}
                  type={"back"}
                  onBarCodeScanned={this._handleBarCodeScanned}
                  style={styles.camera}
                />
                <Button
                title={"Cancelar"}
                containerStyle={styles.cancellContainer}
                buttonStyle={styles.cancellButton}
                titleStyle={styles.buttonTitle}
                disabledTitleStyle={styles.buttonTitle}
                onPress={() => this.setState({ hasPermission: false, scanned: false })}
              />
              </View>
              : <View></View>
          }

        </View>
      </View>
    );
  }
}

export default PaymentsScreen;
