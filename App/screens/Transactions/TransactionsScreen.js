import styles from './styles';
import React, { Component } from 'react';
import { View, Text, FlatList  } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
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
      valor: '',
      descricao: '',
      data: '',
    };
  };
  
  addTransaction = (id) => {
    if(id === 1) {
      let item = {
        descricao: this.state.descricao, 
        valor: this.state.valor,
        data: this.state.data,
      };
      let itens = this.state.itens;
      itens.push(item);
      this.setState({vetor : itens})     
    } else {
      let item = {
        descricao: this.state.descricao, 
        valor: '-' + this.state.valor,
        data: this.state.data,
      };
      let itens = this.state.itens;
      itens.push(item);
      this.setState({vetor : itens})
    }
    this.handleCancel()
  }

  handleCancel = () => {
    this.setState({ 
      dialogReceitaVisible: false, 
      dialogDespesaVisible: false,
      valor: '',
      descricao: '',
      data: '',
       });
  };
  handleDate = (event, date) => {
    this.setState({ show: false })
    if (date === undefined) {

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
                  titleStyle={item.valor > 0 ? styles.receita : styles.despesa }
                  iconDisable
                  title={item.descricao}
                  onPress={() => { }}
                  topRightStyle={ item.valor > 0 ? styles.receita : styles.despesa }
                  topRightText={"R$ " + item.valor}
                  bottomRightStyle={styles.data}
                  bottomRightText={item.data}
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
          <Dialog.Input label="Descrição: " value={this.state.descricao} onChange={({ nativeEvent }) => this.setState({ descricao: nativeEvent.text })} autoFocus={true} style={styles.dialogInput} />
          <Dialog.Input label="Valor" value={this.state.valor} onChange={({ nativeEvent }) => this.setState({ valor: nativeEvent.text })} keyboardType="number-pad" style={styles.dialogInput} />
          <Dialog.Input label="Data:" value={this.state.data} onFocus={() => this.setState({ show: true })} style={styles.dialogInput} />
          {
            this.state.show &&  <DateTimePicker onChange={this.handleDate} maximumDate={new Date()}value={new Date()} />
          }
          <Dialog.Button label="Cancelar" onPress={this.handleCancel} />
          <Dialog.Button label="Inserir" onPress={() => {this.addTransaction(1)} } />
        </Dialog.Container>
        
        <Dialog.Container animationIntTiming={.2} animationOutTiming={.2} onBackdropPress={this.handleCancel} onBackButtonPress={this.handleCancel} onDismiss={this.handleCancel} visible={this.state.dialogDespesaVisible}>
          <Dialog.Title>Inserir Despesa</Dialog.Title>
          <Dialog.Input label="Descrição: " value={this.state.descricao} onChange={({ nativeEvent }) => this.setState({ descricao: nativeEvent.text })} autoFocus={true} style={styles.dialogInput} />
          <Dialog.Input label="Valor" value={this.state.valor} onChange={({ nativeEvent }) => this.setState({ valor: nativeEvent.text })} keyboardType="number-pad" style={styles.dialogInput} />
          <Dialog.Input label="Data:" value={this.state.data} onFocus={() => this.setState({ show: true })} style={styles.dialogInput} />
          {
            this.state.show &&  <DateTimePicker onChange={this.handleDate} maximumDate={new Date()}value={new Date()} />
          }
          <Dialog.Button label="Cancelar" onPress={this.handleCancel} />
          <Dialog.Button label="Inserir" onPress={() => {this.addTransaction(2)} } />
        </Dialog.Container>
      </View>
    );
  }
}

export default TransactionsScreen;