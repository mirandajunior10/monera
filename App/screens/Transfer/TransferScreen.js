import React, { Component } from "react";
import styles from './styles';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Keyboard } from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Icon from 'react-native-vector-icons/Ionicons';
import { TextInputMask } from "react-native-masked-text";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

class TransferScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      banco: '',
      agencia: '',
      conta: '',
      nome: '',
      cpf: '',
    }
  }
  render() {
    return (
      <KeyboardAwareScrollView>
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.header}>
              <Icon name="md-menu" style={styles.menu} onPress={() => this.props.navigation.toggleDrawer()} />
              <View style={styles.titleHeader}>
                <Text style={styles.title}>Transferência</Text>
              </View>
              <Icon name="md-qr-scanner" style={styles.qrcode}></Icon>
            </View>
            <View style={styles.content}>
              <View style={styles.textInputContainer}>
                <Text style={styles.inputTitle}>Banco:</Text>
                <TextInput autoCapitalize="words" style={styles.inputText} />
              </View>
              <View style={styles.textInputContainer}>
                <Text style={styles.inputTitle}>Agência:</Text>
                <TextInput keyboardType='number-pad' style={styles.inputText} />
              </View>
              <View style={styles.textInputContainer}>
                <Text style={styles.inputTitle}>Conta:</Text>
                <TextInput keyboardType='number-pad' style={styles.inputText} />
              </View>
              <View style={styles.textInputContainer}>
                <Text style={styles.inputTitle}>Nome:</Text>
                <TextInput autoCapitalize="words" style={styles.inputText} />
              </View>
              <View style={styles.textInputContainer}>
                <Text style={styles.inputTitle}>CPF:</Text>
                <TextInputMask
                  type={'cpf'}
                  style={styles.inputText}
                  value={this.state.cpf}
                  onChangeText={text => {
                    this.setState({
                      cpf: text
                    })
                  }}
                  ref={(ref) => this.cpfField = ref}
                />
              </View>
              <TouchableOpacity style={styles.button} activeOpacity={0.5}>
                <Text style={styles.buttonText}>Transferir</Text>
              </TouchableOpacity>
            </View>
        </TouchableWithoutFeedback>
      </View>
      </KeyboardAwareScrollView>
    );
  }

}



export default TransferScreen;
