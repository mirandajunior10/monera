import styles from './styles';
import React, { Component } from 'react';
import { Button } from "react-native-elements";
import { View, Text, FlatList, TouchableOpacity, TextInput } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import actions from './actions';
import Icon from 'react-native-vector-icons/Ionicons';
import { FloatingAction } from 'react-native-floating-action';
import { Card } from "@paraboly/react-native-card";
import { handleAddTransaction, handleAction, handleDate, fetchPortfolio, handleSnapshot, fecthStocks, getStocks, validateInput } from './functions';
import { database, auth } from '../../config/config';
import Overlay from 'react-native-modal-overlay';
import Autocomplete from 'react-native-autocomplete-input';
import { handleCancel } from './functions';
import Swipeout from 'react-native-swipeout';

class StocksScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      portfolio: [],
      valor: '',
      descricao: '',
      data: '',
      isLoggedIn: true,
      saldo: 0,
      quantidade: '',
      saldoDisplay: '0,00',
      refreshing: false,
      selected: false,
      selectedDate: false,
      selectedStock: '',
      stocksSuggestions: [],
      allowed: true,
      show: false
    };

    fecthStocks(this);

  };

  componentDidMount() {
    let that = this
    database.ref('users/' + auth.currentUser.uid + '/stocks').on("value", function (snapshot) {
      if (!auth.currentUser) return
      that.setState({ refreshing: true })
      handleSnapshot(that, snapshot)
      that.setState({ refreshing: false })

    }, function (error) {
      console.log("The read failed: " + error.code);
    })



  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Icon name="md-menu" style={styles.menu} onPress={() => this.props.navigation.toggleDrawer()} />
          <View style={styles.titleHeader}>
            <Text style={styles.title}>Investimentos</Text>
          </View>
        </View>
        <View style={styles.content}>
          <View style={this.state.saldo >= 0 ? [styles.saldoContainer, styles.containerPositivo] : [styles.saldoContainer, styles.containerNegativo]} >
            <Text style={styles.saldo}>Investimento total:
              <Text style={this.state.saldo >= 0 ? styles.saldoPositivo : styles.saldoNegativo}> R$ {this.state.saldoDisplay}</Text>
            </Text>
          </View>
          <View style={styles.transacoesContainer}>
          <FlatList
            refreshing={this.state.refreshing}
            onRefresh={() => fetchPortfolio(this)}
            style={styles.transacoesContainer}
            data={this.state.portfolio}
            keyExtractor={(item, index) => String(index)}
            ListEmptyComponent={<Text>Não tem nada aqui</Text>}
            showsVerticalScrollIndicator={false}
            renderItem={
              ({ item }) => (

              <View 
              onPress={() => { this.props.navigation.navigate("StockTransactionsScreen", { transactions: item[1].transactions, ticker: item[0] }) }}
              style={styles.itensContainer}> 

                <Swipeout
                style={styles.swipeButton}
                autoClose={true} right={[
                  {
                    text: 'Deletar',
                    type: 'delete',
                    onPress: () => {
                      Alert.alert(
                        'Exclusão',
                        'Tem certeza que deseja excluir a transação:  ' + item[1].descricao + '?',
                        [
                          { text: 'Sim', onPress: () => { deleteTransaction(item, this) }, style: 'cancel' },
                          { text: 'Não', onPress: () => { }, style: 'cancel' },
                        ],
                        { cancelable: true }
                      );
                    }

                  }
                ]}>
                <View style={styles.itemTop}>
                  <Text style={[styles.textStyle, styles.ticker]}>{item[0]}</Text>
                  <Text style={[styles.textStyle, styles.nomeEmpresa]}>{item[1].empresa}</Text>
                </View>
                <View style={styles.itemBottom}>
                  <Text style={styles.data}>{"Quantidade: " + item[1].quantidade}</Text>
                  <Text style={styles.data}>{"Preço Médio: R$" + item[1].PMDisplay}</Text>  
                </View>
            
                </Swipeout>
               </View>           
              )
            }
          />
          </View>

          <Overlay
            visible={this.state.modalVisible}
            closeOnTouchOutside
            onClose={() => handleCancel(this)}
            animationType="zoomIn"
            containerStyle={styles.overlayContainer}
            childrenWrapperStyle={styles.overlayWrapper}
            animationDuration={200}>

          <View style={styles.acaoContainer}>
            <Text style={styles.titleNovaOrdem}>Inserir ação</Text>
            <View style={styles.autoCompleteView}>
            <Text style={styles.inputTitle}>Código da ação</Text>
            <Autocomplete
              inputContainerStyle={styles.inputContainer}
              listContainerStyle={styles.autocompleteList}
              listStyle={styles.listAutocompleteStyle}
              autoCapitalize="none"
              hideResults={this.state.selected}
              keyExtractor={(item, index) => index.toString()}
              autoCorrect={false}
              data={this.state.stocksSuggestions}
              defaultValue={this.state.selectedStock}
              onChangeText={text => { getStocks(this, text); this.setState({ selected: false }) }}
              placeholder="Código da ação"
              renderItem={({ item }) => (

                //you can change the view you want to show in suggestion from here
                <TouchableOpacity onPress={() => this.setState({ stockData: item, selectedStock: item.symbol.split('.')[0], selected: true })}>
                  <Text style={styles.itemText}>
                    {item.symbol.split('.')[0]}
                  </Text>
                </TouchableOpacity>
              )}
            />
            </View>
            <View style={styles.formContainer}>
            <Text style={styles.inputTitle}>Quantidade</Text>
            <TextInput
              placeholder="Digite a quantidade"
              keyboardType={"number-pad"}
              value={this.state.quantidade}
              onChangeText={(text) => this.setState({ quantidade: text })}
              style={styles.inputText} />

            <Text style={styles.inputTitle}>Valor</Text>
            <TextInput
              placeholder="Digite o valor da ação"
              keyboardType={"number-pad"}
              value={this.state.valor}
              onChangeText={(text) => this.setState({ valor: text })}
              style={styles.inputText} />

            <Text style={styles.inputTitle}>Data</Text>
            <TextInput
              placeholder="Selecione a data "
              autoCapitalize="words"
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
            </View>
            <Button
              title={"Inserir"}
              buttonStyle={styles.overlayButton}
              titleStyle={styles.buttonTitle}
              disabledTitleStyle={styles.buttonTitle}
              onPress={() => {
                if (validateInput(this) === true) handleAddTransaction(this, 1)
              }}
            />
            </View>
            
          </Overlay>
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

export default StocksScreen;