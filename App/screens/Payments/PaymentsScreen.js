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
        <View style={styles.content}>
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
          <Button
              title={"Digitar código de barras manualmente"}
              buttonStyle={styles.overlayButton}
              titleStyle={[styles.buttonTitle, styles.saldoPositivo]}
              disabledTitleStyle={styles.buttonTitle}
              onPressItem={
                (name) => {
                  handleAction(this, name);
                }
              }/>
          <Overlay
            visible={this.state.codigoOverlay}
            closeOnTouchOutside
            onBackdropPress={() => { handleCancel(this) }}
            onBackButtonPress={() => { handleCancel(this) }}
            onDismiss={() => { handleCancel(this) }}
            onClose={() => handleCancel(this)}
            animationType="zoomIn"
            containerStyle={styles.overlayContainer}
            childrenWrapperStyle={styles.overlayWrapper}
            animationDuration={200}>

              <Text style={[styles.titleOverlay, styles.saldoPositivo]}>Inserir Receita</Text>

                <Text style={styles.inputTitle}>Descrição:</Text>
                <TextInput
                  placeholder="Digite a descrição"
                  value={this.state.descricao}
                  onChange={({ nativeEvent }) => this.setState({ descricao: nativeEvent.text })}
                  autoFocus={true}
                  style={styles.inputText} />

                <Text style={styles.inputTitle}>Valor:</Text>
                <TextInput
                  placeholder="Digite o valor"
                  value={this.state.valor}
                  onChange={({ nativeEvent }) => this.setState({ valor: nativeEvent.text })}
                  keyboardType="number-pad"
                  style={styles.inputText} />

                <Text style={styles.inputTitle}>Data:</Text>
                <TextInput
                  placeholder="Selecione a data "
                  style={styles.inputText}
                  value={this.state.data}
                  onFocus={() => this.setState({ show: true })}
                />
                {
                  this.state.show &&
                  <DateTimePicker
                    onChange={(event, date) => { handleDate(this, event, date) }}
                    maximumDate={new Date()}
                    value={new Date()}
                    textColor="red"
                  />
                }
              <View style={styles.buttonContainer}>
              <Button
                  title={"Cancelar"}
                  buttonStyle={styles.overlayButton}
                  titleStyle={[styles.buttonTitle, styles.saldoPositivo]}
                  disabledTitleStyle={styles.buttonTitle}
                  onPress={() => { handleCancel(this) }}
                />
                <Button
                  title={"Inserir"}
                  buttonStyle={styles.overlayButton}
                  titleStyle={[styles.buttonTitle, styles.saldoPositivo]}
                  disabledTitleStyle={styles.buttonTitle}
                  onPressItem={
                    (name) => {
                      handleAction(this, name);
                    }
                  }
                />
              </View>
          </Overlay>
          </View>
      </View>
    );
  }
}

export default PaymentsScreen;
