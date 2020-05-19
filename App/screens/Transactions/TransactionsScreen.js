import styles from './styles';
import React, { Component } from 'react';
import { View, Text, FlatList, ScrollView, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import actions from './actions';
import Icon from 'react-native-vector-icons/Ionicons';
import Dialog from "react-native-dialog";
import { FloatingAction } from 'react-native-floating-action';
import { Card } from "@paraboly/react-native-card";
import { handleAddTransaction, handleAction, fetchTransactions, handleCancel, handleDate, updateTransactions, deleteTransaction } from './functions';
import { auth } from '../../config/config';
import Swipeout from 'react-native-swipeout';
class TransactionsScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dialogReceitaVisible: false,
      dialogDespesaVisible: false,
      transactions: [],
      valor: '',
      descricao: '',
      data: '',
      isLoggedIn: true,
      saldo: '',
      refreshing: false,

    };
  };


  componentDidMount() {
    auth.onAuthStateChanged(user => {
      if (user) {
        this.setState({ isLoggedIn: true })
        //var that = this;
        this.setState({ refreshing: true })
        fetchTransactions(user, this);
        this.setState({ refreshing: false })

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
            <Text style={styles.title}>Transações</Text>
          </View>
        </View>
        <View style={styles.content}>
          <Text style={this.state.saldo >=0 ? styles.saldoPositivo : styles.saldoNegativo}>Saldo: R$ {this.state.saldo}</Text>
          <FlatList
            refreshing={this.state.refreshing}
            onRefresh={() => updateTransactions(this)}
            style={styles.transacoes}
            data={this.state.transactions}
            keyExtractor={(item, index) => String(index)}
            showsVerticalScrollIndicator={false}
            renderItem={
              ({ item }) => (
                <Swipeout autoClose={true} right={[
                  {
                    text: 'Deletar',
                    type: 'delete',
                    onPress: () => {
                      Alert.alert(
                        'Exclusão', 
                        'Tem certeza que deseja excluir o item ' + item[1].descricao + '?',
                        [
                          { text: 'Sim', onPress: () => { deleteTransaction(item[0], this) }, style: 'cancel' },
                          { text: 'Não', onPress: () => {}, style: 'cancel' },
                        ],
                        {cancelable: true}
                      );
                    }

                  }
                ]}>
                  <View style={{ backgroundColor: 'white', flex: 1, flexDirection: "column" }}>
                    <Card
                      titleStyle={item[1].valor > 0 ? styles.receita : styles.despesa}
                      iconDisable
                      title={item[1].descricao}
                      onPress={() => { }}
                      topRightStyle={item[1].valor > 0 ? styles.receita : styles.despesa}
                      topRightText={"R$ " + item[1].valor}
                      contentStyle={styles.data}
                      content={item[1].data}
                    />
                  </View>
                </Swipeout>
              )
            }
          />
          <Dialog.Container
            animationIntTiming={.2}
            animationOutTiming={.2}
            onBackdropPress={() => { handleCancel(this) }}
            onBackButtonPress={() => { handleCancel(this) }}
            onDismiss={() => { handleCancel(this) }}
            visible={this.state.dialogReceitaVisible}>

            <Dialog.Title>Inserir Receita</Dialog.Title>
            <Dialog.Input
              label="Descrição: "
              value={this.state.descricao}
              onChange={({ nativeEvent }) => this.setState({ descricao: nativeEvent.text })}
              autoFocus={true}
              style={styles.dialogInput}
            />
            <Dialog.Input
              label="Valor"
              value={this.state.valor}
              onChange={({ nativeEvent }) => this.setState({ valor: nativeEvent.text })}
              keyboardType="number-pad"
              style={styles.dialogInput}
            />
            <Dialog.Input
              label="Data:"
              value={this.state.data}
              onFocus={() => this.setState({ show: true })}
              style={styles.dialogInput}
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
            <Dialog.Button
              label="Cancelar"
              onPress={() => { handleCancel(this) }}
            />
            <Dialog.Button
              label="Inserir"
              onPress={() => { handleAddTransaction(this, 1) }}
            />
          </Dialog.Container>

          <Dialog.Container
            animationIntTiming={.2}
            animationOutTiming={.2}
            onBackdropPress={() => { handleCancel(this) }}
            onBackButtonPress={() => { handleCancel(this) }}
            onDismiss={() => { handleCancel(this) }}
            visible={this.state.dialogDespesaVisible}>
            <Dialog.Title>Inserir Despesa</Dialog.Title>
            <Dialog.Input
              label="Descrição: "
              value={this.state.descricao}
              onChange={({ nativeEvent }) => this.setState({ descricao: nativeEvent.text })}
              autoFocus={true}
              style={styles.dialogInput}
            />
            <Dialog.Input
              label="Valor"
              value={this.state.valor}
              onChange={({ nativeEvent }) => this.setState({ valor: nativeEvent.text })}
              keyboardType="number-pad"
              style={styles.dialogInput}
            />
            <Dialog.Input
              label="Data:"
              value={this.state.data}
              onFocus={() => this.setState({ show: true })}
              style={styles.dialogInput}
            />
            {
              this.state.show &&
              <DateTimePicker
                onChange={(event, date) => handleDate(this, event, date)}
                maximumDate={new Date()}
                value={new Date()}
              />
            }
            <Dialog.Button
              label="Cancelar"
              onPress={() => { handleCancel(this) }}
            />
            <Dialog.Button
              label="Inserir"
              onPress={() => { handleAddTransaction(this, 2) }}
            />
          </Dialog.Container>
        </View>
        <FloatingAction
          overlayColor={'none'}
          actions={actions}
          color='#00C79C'
          onPressItem={
            (name) => {
              handleAction(this, name);
            }
          }
        />
      </View>
    );
  }
}

export default TransactionsScreen;