import styles from './styles';
import React, { Component } from 'react';
//import { Icon } from "react-native-elements";
import { View, Text } from 'react-native';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import Dialog from "react-native-dialog";



class TransactionsScreen extends Component {
  state = {
    dialogVisible: false
  };
  showDialog = () => {
    this.setState({ dialogVisible: true });
  };
 
  handleCancel = () => {
    this.setState({ dialogVisible: false });
  };
  handleDelete = () => {
    this.setState({ dialogVisible: false });
  };

    render() {
        return (
          
            <View style={styles.container}>
              <View style={ styles.header }>
                <Icon name="md-menu" style={ styles.menu } onPress={() => this.props.navigation.toggleDrawer()} />
                <Text style={ styles.fontHeader }>Transações</Text>
              </View>
              <ActionButton buttonColor="#FBE158">
                <ActionButton.Item
                  buttonColor="#00C79C"
                  title="Adicionar Receita"
                  onPress={() => {this.showDialog()} }>
                  <Icon name="md-trending-up" style={styles.actionButtonIcon} />
                </ActionButton.Item>
                <ActionButton.Item
                  buttonColor="#FF6D6B"
                  title="Adicionar Despesa"
                  onPress={() => alert('Added to favourite')}>
                  <Icon name="md-trending-down" style={styles.actionButtonIcon} />
                </ActionButton.Item>
            </ActionButton>
             
            <Dialog.Container animationOutTiming={.2} animationOutTiming={.2} visible={this.state.dialogVisible}>
              <Dialog.Title>Inserir Receita</Dialog.Title>
                <Dialog.Description>
                  Digite o valor:
                </Dialog.Description>
                <Dialog.Input keyboardType="number-pad" autoFocus={true} style={ styles.dialogInput }/>
                <Dialog.Button label="Cancelar" onPress={this.handleCancel} />
                <Dialog.Button label="Inserir" onPress={this.handleDelete} />
              </Dialog.Container>
      </View>
    );
  }
}

export default TransactionsScreen;
