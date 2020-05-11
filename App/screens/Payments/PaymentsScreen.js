import styles from './styles';
import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Icon } from "react-native-elements";
import { BarCodeScanner } from 'expo-barcode-scanner';
import { auth } from '../../config/config';


class PaymentsScreen extends Component {

  static navigationOptions = ({ navigation }) => ({
    headerTitle: "Pagamentos",
    headerTintColor: "white",
    headerStyle: {
      backgroundColor: '#00C79C'
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

     


    );
  }
}

export default PaymentsScreen;
