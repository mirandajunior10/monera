import styles from './styles';
import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { auth } from '../../config/config';


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
    this.setState({ scanned: true });
    console.log('result', result);
    //console.log('data', data)
    if (this.state.scanned !== true)
      alert(`Bar code with type ${result.type} and data ${result.data} has been scanned!`);
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
        <View style={styles.container}>
          {/* Enquanto a permisssão não for cedida...*/}
          {this.state.hasPermission === null ?
            <View></View> :
            //Se a permissão for negada
            this.state.hasPermission === false ?

              <Text>A permissão para a câmera foi negada</Text> :
              //Se o código de barras não tiver sido lido
              this.state.scanned === false ?
                <BarCodeScanner
                  barCodeTypes={[BarCodeScanner.Constants.BarCodeType.itf14]}
                  type={BarCodeScanner.Constants.Type.back}
                  onBarCodeScanned={this._handleBarCodeScanned}
                  style={StyleSheet.absoluteFill}
                /> :
                //Se o código de barras  tiver sido lido

                <View></View>
          }
        </View>
      </View>
    );
  }
}

export default PaymentsScreen;
