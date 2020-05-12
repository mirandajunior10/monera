import styles from './styles';
import React, { Component } from 'react';
import { View, Text, FlatList } from 'react-native';
import actions from './actions';
import Icon from 'react-native-vector-icons/Ionicons';
import Dialog from "react-native-dialog";
import { FloatingAction } from 'react-native-floating-action';
import { Card } from "@paraboly/react-native-card";


/* const 

const handleRenderItem = ({item}) => <Text style={styles.item}>{item}</Text>

const handleAdd = () => {
  if(transactions.trim()) {
      updateItens([...transactions, transaction]);
  }
} */

class TransactionsScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dialogReceitaVisible: false,
      dialogDespesaVisible: false,
      itens: [],
      valorDespesa: '',
      valorReceita: '',
      descReceita: '',
      descDespesa: '',
    };
  };
  
  addTransaction = () => {
    let item = {
      descricao: this.state.descReceita, 
      valor: this.state.valorReceita
    };
    let itens = this.state.itens;
    itens.push(item);
    this.setState({vetor : itens})
    this.handleCancel()
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
        <View style={ styles.header }>
            <Icon name="md-menu" style={ styles.menu } onPress={() => this.props.navigation.toggleDrawer()} />
            <View style={ styles.titleHeader }>
              <Text style={ styles.title}>Transações</Text>
            </View>
        </View>
        <FlatList
          style={styles.transacoes}
          data={this.state.itens}
          keyExtractor={(item, index) => String(index)}
          renderItem={
            ({ item }) => (
              <View>
                <Card
                  titleStyle={styles.transacao}
                  iconDisable
                  title={item.descricao}
                  onPress={() => { }}
                  bottomRightText={"R$" + item.valor}
                  bottomRightStyle={styles.valor}
                  topRightText={''}
                />
              </View>
            )
          }
        />
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
          <Dialog.Input label="Descrição: " value={this.state.descReceita} onChange={({ nativeEvent }) => this.setState({ descReceita: nativeEvent.text })} autoFocus={true} style={styles.dialogInput} />
          <Dialog.Input label="Valor" value={this.state.valorReceita} onChange={({ nativeEvent }) => this.setState({ valorReceita: nativeEvent.text })} keyboardType="number-pad" style={styles.dialogInput} />
          <Dialog.Button label="Cancelar" onPress={this.handleCancel} />
          <Dialog.Button label="Inserir" onPress={this.addTransaction} />
        </Dialog.Container>

        <Dialog.Container animationIntTiming={.2} animationOutTiming={.2} onBackdropPress={this.handleCancel} onBackButtonPress={this.handleCancel} onDismiss={this.handleCancel} visible={this.state.dialogDespesaVisible}>
          <Dialog.Title>Inserir Despesa</Dialog.Title>
          <Dialog.Input label="Descrição: " value={this.state.descDespesa} onChange={({ nativeEvent }) => this.setState({ descDespesa: nativeEvent.text })} autoFocus={true} style={styles.dialogInput} />
          <Dialog.Input label="Valor" value={this.state.valorDespesa} onChange={({ nativeEvent }) => this.setState({ valorDespesa: nativeEvent.text })} keyboardType="number-pad" style={styles.dialogInput} />
          <Dialog.Button label="Cancelar" onPress={this.handleCancel} />
          <Dialog.Button label="Inserir" onPress={this.addTransaction} />
        </Dialog.Container>
      </View>
    );
  }
}

export default TransactionsScreen;
