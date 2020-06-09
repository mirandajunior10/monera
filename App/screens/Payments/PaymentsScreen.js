import styles from './styles';
import React, { Component } from 'react';
import { Text, View, StyleSheet, TextInput } from 'react-native';
import { Button } from "react-native-elements";
import Icon from 'react-native-vector-icons/Ionicons';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { handleAction, handleDate, handleCancel } from "./functions";
import { TouchableOpacity } from 'react-native-gesture-handler';

class PaymentsScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      hasPermission: null,
      scanned: false,
      isLoggedIn: true
    };
  }

  _handleBarCodeScanned = (result) => {
    this.setState({ scanned: true, barcode: result.data });
  };

  async getPermissions() {
    const { status } = await BarCodeScanner.requestPermissionsAsync();
    this.setState({ hasPermission: status === 'granted' })
  }

  async componentDidMount() {
    this.setState({ hasPermission: false })

  }

  render() {

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Icon name="md-menu" style={styles.menu} onPress={() => this.props.navigation.toggleDrawer()} />
          <View style={styles.titleHeader}>
            <Text style={styles.title}>Pagamentos</Text>
          </View>
        </View>
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
            <Button style={styles.cancellButton} title={`Cancelar`} onPress={() => this.setState({ hasPermission: false, scanned: false })}/>
              </View>
              : <View></View>
          }

        </View>
      </View>
    );
  }
}

export default PaymentsScreen;
