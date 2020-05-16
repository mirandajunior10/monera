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
    this.setState({scanned: true});
    console.log('result', result);
    //console.log('data', data)
    if(this.state.scanned !== true)
    alert(`Bar code with type ${result.type} and data ${result.data} has been scanned!`);
  };

  componentDidMount() {
    auth.onAuthStateChanged(async user => {
      if (user) {
        this.setState({ isLoggedIn: true })
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        this.setState({ hasPermission: status === 'granted' })

      } else {
        this.setState({ isLoggedIn: false })
      }
    });
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
        {this.state.hasPermission === null ?
            <Text>Requesting for camera permission</Text> :
            this.state.hasPermission === false ?
              <Text>Camera permission is not granted</Text> :
              <BarCodeScanner
               barCodeTypes={[BarCodeScanner.Constants.BarCodeType.itf14]}
                type={BarCodeScanner.Constants.Type.back}
                onBarCodeScanned={this._handleBarCodeScanned}
                style={StyleSheet.absoluteFill}
              />
          }
        </View>
        </View>
    );
  }
}

export default PaymentsScreen;
