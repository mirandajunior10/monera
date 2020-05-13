import React, { Component } from "react";
import styles from './styles';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity
} from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';

class TransferScreen extends Component {
  render(){
    return (
        <View style={styles.container}>
          <View style={styles.header}>
            <Icon name="md-menu" style={styles.menu} onPress={() => this.props.navigation.toggleDrawer()} />
            <View style={styles.titleHeader}>
              <Text style={styles.title}>Transferência</Text>
            </View>
            <Icon name="md-qr-scanner" style={styles.qrcode}></Icon>
          </View>
          <View style = { styles.content}>
            <View style={ styles.textInputContainer}>
              <Text style={styles.inputTitle}>Banco:</Text>
              <TextInput autoCapitalize="words" style={styles.inputText} />
            </View>
            <View style={ styles.textInputContainer}>
              <Text style={styles.inputTitle}>Agência:</Text>
              <TextInput keyboardType='number-pad' style={styles.inputText} />
            </View>
            <View style={ styles.textInputContainer}>
              <Text style={styles.inputTitle}>Conta:</Text>
              <TextInput keyboardType='number-pad' style={styles.inputText} />
            </View>
            <View style={ styles.textInputContainer}>
              <Text style={styles.inputTitle}>Nome:</Text>
              <TextInput autoCapitalize="words" style={styles.inputText} />
            </View>
            <View style={ styles.textInputContainer}>
              <Text style={styles.inputTitle}>CPF:</Text>
              <TextInput keyboardType='number-pad' style={styles.inputText}/>
            </View>
            <TouchableOpacity style={styles.button} activeOpacity={0.5}>
                  <Text style={styles.buttonText}>Transferir</Text>
            </TouchableOpacity>
          </View>
          
        </View>
      );
  }  
  
}



export default TransferScreen;
