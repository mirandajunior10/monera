import styles from './styles';
import React, { Component } from 'react';
import { View, Text, FlatList, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import actions from './actions';
import Icon from 'react-native-vector-icons/Ionicons';
import Dialog from "react-native-dialog";
import { FloatingAction } from 'react-native-floating-action';
import { Card } from "@paraboly/react-native-card";
import { handleAddTransaction, handleAction, fetchTransactions, handleCancel, handleDate, updateTransactions, deleteTransaction, handleSnapshot } from './functions';
import { database, auth } from '../../config/config';
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
      saldo: 0,
      saldoDisplay: '0',
      refreshing: false,

    };
  };


  componentDidMount() {
    
    this.setState({ refreshing: true })
    fetchTransactions(this);
    this.setState({ refreshing: false })
    let that = this
    
    database.ref('users/' + auth.currentUser.uid).on("value", function(snapshot){
    handleSnapshot(that, snapshot)
    })



  }

  componentWillUnmount(){
    database.ref('users/' + auth.currentUser.uid).off();
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
          <View style={this.state.saldo >= 0 ? [styles.saldoContainer, styles.containerPositivo] : [styles.saldoContainer, styles.containerNegativo]} >
            <Text style={styles.saldo}>Saldo disponível:
              <Text style={this.state.saldo >= 0 ? styles.saldoPositivo : styles.saldoNegativo}> R$ {this.state.saldoDisplay}</Text>
            </Text>
          </View>
          
          <FlatList
            refreshing={this.state.refreshing}
            onRefresh={() => updateTransactions(this)}
            style={styles.transacoes}
            data={this.state.transactions}
            keyExtractor={(item, index) => String(index)}
            ListEmptyComponent={<Text>Não tem nada aqui</Text>}
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
                          { text: 'Sim', onPress: () => { deleteTransaction(item, this) }, style: 'cancel' },
                          { text: 'Não', onPress: () => { }, style: 'cancel' },
                        ],
                        { cancelable: true }
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
                      topRightText={"R$ " + item[1].valorDisplay}
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