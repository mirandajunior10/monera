import styles from './styles';
import React, { Component } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import actions from './actions';
//import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import Dialog from "react-native-dialog";
import { FloatingAction } from 'react-native-floating-action';


class TransactionsScreen extends Component {


  constructor(props) {
    super(props);
    this.state = {
      dialogReceitaVisible: false,
      dialogDespesaVisible: false,
      textDespesa: '',
      textReceita: ''
    };
  }

  handleCancel = () => {
    this.setState({ 
      dialogReceitaVisible: false, 
      dialogDespesaVisible: false,
      textDespesa: '',
      textReceita: ''
       });
  };

  handleAction(name) {
    switch (name) {
      case 'add_receita':
        this.setState({ dialogReceitaVisible: true });
        break;
      case 'add_despesa':
        this.setState({ dialogDespesaVisible: true });
      default:
        break;
    }
  }

  render() {
    return (

      <View style={styles.container}>
        <View style={styles.header}>
          <Icon name="md-menu" style={styles.menu} onPress={() => this.props.navigation.toggleDrawer()} />
          <Text style={styles.fontHeader}>Transações</Text>
        </View>
        <FloatingAction
          overlayColor={'none'}
          actions={actions}
          color='#00C79C'
          onPressItem={
            (name) => {
              this.handleAction(name);
            }
          }
        />

        <Dialog.Container animationIntTiming={.2} animationOutTiming={.2} onBackdropPress={this.handleCancel} onBackButtonPress={this.handleCancel} onDismiss={this.handleCancel} visible={this.state.dialogReceitaVisible}>
          <Dialog.Title>Inserir Receita</Dialog.Title>
          <Dialog.Description >
            Digite o valor:
          </Dialog.Description>
          <Dialog.Input value={this.state.textReceita} onChange={({ nativeEvent }) => this.setState({ textReceita: nativeEvent.text })} keyboardType="number-pad" autoFocus={true} style={styles.dialogInput} />
          <Dialog.Button label="Cancelar" onPress={this.handleCancel} />
          <Dialog.Button label="Inserir" onPress={this.handleCancel} />
        </Dialog.Container>


        <Dialog.Container animationIntTiming={.2} animationOutTiming={.2} onBackdropPress={this.handleCancel} onBackButtonPress={this.handleCancel} onDismiss={this.handleCancel} visible={this.state.dialogDespesaVisible}>
          <Dialog.Title>Inserir Despesa</Dialog.Title>
          <Dialog.Description >
            Digite o valor:
          </Dialog.Description>
          <Dialog.Input onChange={({ nativeEvent }) => this.setState({ textDespesa: nativeEvent.text })} value={this.state.textDespesa} keyboardType="number-pad" autoFocus={true} style={styles.dialogInput} />
          <Dialog.Button label="Cancelar" onPress={this.handleCancel} />
          <Dialog.Button label="Inserir" onPress={this.handleCancel} />
        </Dialog.Container>

      </View>
    );
  }
}

export default TransactionsScreen;
