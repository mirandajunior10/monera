import styles from './styles';
import React, { Component } from 'react';
import { View, Text, FlatList } from 'react-native';
import DateTimePicker from "@react-native-community/datetimepicker";
import actions from './actions';
import Icon from 'react-native-vector-icons/Ionicons';
import Dialog from "react-native-dialog";
import { FloatingAction } from 'react-native-floating-action';
import { Card } from "@paraboly/react-native-card";

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
      data: '',
      show: false
    };
  };

  addTransaction = () => {
    let item = {
      descricao: this.state.descReceita,
      valor: this.state.valorReceita
    };
    let itens = this.state.itens;
    itens.push(item);
    this.setState({ vetor: itens })
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

  handleDate = (event, date) => {
    this.setState({ show: false })
    if (date === undefined) {
      this.setState({data: ''})
    }
    else {

      var data = date.getDate();
      var month = date.getMonth(); //Be careful! January is 0 not 1
      var year = date.getFullYear();

      var dateString = data + "/" + (month + 1) + "/" + year;
      this.setState({ data: dateString })
      this.state.data.format('dd/mm/yyyy')
    }

  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Icon name="md-menu" style={styles.menu} onPress={() => this.props.navigation.toggleDrawer()} />
          <View style={styles.titleHeader}>
            <Text style={styles.title}>Transações</Text>
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
          <Dialog.Input label="Data: " value={this.state.data} onFocus={() => this.setState({ show: true })} style={styles.dialogInput} />
          {
            this.state.show &&

            <DateTimePicker
              onChange={this.handleDate}
              maximumDate={new Date()}
              value={new Date()}
            />
          }
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
