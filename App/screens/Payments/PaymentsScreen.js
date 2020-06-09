import styles from './styles';
import React, { Component } from 'react';
import { Text, View, StyleSheet, Button, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { auth } from '../../config/config';
import Overlay from 'react-native-modal-overlay';
import { handleAction, handleDate, handleCancel } from "./functions";

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

  async componentDidMount() {
    const { status } = await BarCodeScanner.requestPermissionsAsync();
    this.setState({ hasPermission: status === 'granted' })

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
                autoFocus={true}
                style={styles.inputText} />
          <Icon name="md-camera" style={styles.iconInput} onPress={() => this.props.navigation.toggleDrawer()} />
        </View>
          
          {/* Enquanto a permisssão não for cedida...*/}
          {this.state.hasPermission === null ?
            <View>
              <Text>A permissão para a câmera foi negada</Text>
              <Button title={"Permitir acesso a câmera"}></Button>
            </View> :
            //Se a permissão for negada
            this.state.hasPermission === false ?
              <View>
                <Text>A permissão para a câmera foi negada</Text> :
                <Button title={"Permitir acesso a câmera"}></Button>
              </View>
              :
              this.state.scanned === false ?

                //Se o código de barras não tiver sido lido
                <View style={styles.barcodeScanner}>
                  <BarCodeScanner
                    barCodeTypes={[BarCodeScanner.Constants.BarCodeType.itf14]}
                    type={"back"}
                    onBarCodeScanned={this._handleBarCodeScanned}
                    style={StyleSheet.absoluteFill}
                  >
                  </BarCodeScanner>
                  {/* O BOTÃO TEM QUE FICAR AQUI, OU DENTRO DO BARCODESCANNER (É POSSÍVEL) */}

                </View>

                :
                //Se o código de barras  tiver sido lido
                <View style={styles.valorContainer}>
                  <Text style={styles.inputTitle}>Código de barras:</Text>
                  <TextInput value={this.state.barcode}></TextInput>
                </View>
          }
      
        </View>
      </View>
    );
  }
}

export default PaymentsScreen;
