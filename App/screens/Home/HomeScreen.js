import styles from './styles';
import React, { Component } from 'react';
//import { Icon } from "react-native-elements";
import { Text, View, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { Button } from "react-native-elements";
import { Card } from "@paraboly/react-native-card";
import { FloatingAction } from 'react-native-floating-action';
import actions from './actions'
import { fetchUserData, fecthStocks, getStocks, fetchTransactions, handleCancel } from "./functions";
import Overlay from 'react-native-modal-overlay';
import Autocomplete from 'react-native-autocomplete-input';
import Icon from 'react-native-vector-icons/Ionicons';
import { database, auth } from '../../config/config';

// chave pra alphaVantage 1T892FN50JQK75LM

class HomeScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      portfolio: [],
      stocks: [],
      modalVisible: false,
      dialogVisible: false,
      stocksSuggestions: [],
      selectedStock: '',
      selected: false,
      saldoDisplay: '0',
      receitaDisplay: '0',
      despesaDisplay: '0',
      userId: '',
    };

    fecthStocks(this);

  }

  componentDidMount() {

    fetchUserData(this);
    let that = this
    database.ref('users/' + auth.currentUser.uid + '/transactions').on('value', function (snapshot) {
      if (!auth.currentUser) return
      fetchTransactions(that, snapshot)
    }, function (errorObject) {
      console.log("The read failed: " + errorObject.code);
    })

  }

  componentWillUnmount() {
    if (auth.currentUser)
      database.ref('users/' + auth.currentUser.uid + '/transactions').off();
  }

  onClose = () => {
    this.state.stocksSuggestions = []
    this.setState({ modalVisible: false, selectedStock: '' });
  }
  handleAction(name) {
    switch (name) {
      case 'bt_nova_acao':
        this.setState({ modalVisible: true })
        break;
      default:
        break;
    }
  }
  render() {

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Icon name="md-menu" style={styles.menu} onPress={() => this.props.navigation.toggleDrawer()} />
          <View style={styles.titleHeader}>
            <Text style={styles.title}>Minhas Finanças</Text>
          </View>
        </View>

        <View style={styles.content}>

          <Overlay
            visible={this.state.modalVisible}
            closeOnTouchOutside
            onClose={this.onClose}
            animationType="zoomIn"
            containerStyle={styles.overlayContainer}
            childrenWrapperStyle={styles.overlayWrapper}
            animationDuration={200}>

            <Text style={styles.titleNovaOrdem}>Digite uma ação</Text>

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
              onChangeText={text => { getStocks(this, text) }}
              placeholder="Código da ação"
              renderItem={({ item }) => (

                //you can change the view you want to show in suggestion from here
                <TouchableOpacity onPress={() => this.setState({ selectedStock: item.symbol.split('.')[0], selected: true })}>
                  <Text style={styles.itemText}>
                    {item.symbol.split('.')[0]}
                  </Text>
                </TouchableOpacity>
              )}
            />
            <Text style={styles.inputTitle}>Qantidade</Text>
            <TextInput
                  autoCapitalize="words"
                  onBlur={() => setFieldTouched("banco")}
                  style={styles.inputText} />
            
            <Text style={styles.inputTitle}>Valor</Text>
            <TextInput
                  autoCapitalize="words"
                  onBlur={() => setFieldTouched("banco")}
                  style={styles.inputText} />

            {<Button
              title={"Inserir"}
              buttonStyle={styles.overlayButton}
              titleStyle={styles.buttonTitle}
              disabledTitleStyle={styles.buttonTitle}

            />}
          </Overlay>

          <TouchableOpacity onPress={() => this.props.navigation.navigate("TransactionsScreen")} >
            <Text style={styles.resumoTitle}>Resumo Financeiro</Text>
            <View style={this.state.saldo >= 0 ? [styles.resumoContainer, styles.containerPositivo] : [styles.resumoContainer, styles.containerNegativo]}>
              <View style={[styles.saldoContainer, styles.containerPositivo]}>
                <Text style={styles.saldo}>Receitas:
              <Text style={styles.saldoPositivo}> R$ {this.state.receitaDisplay}</Text>
                </Text>
                <Text style={styles.saldo}>Despesas:
              <Text style={styles.saldoNegativo}> R$ {this.state.despesaDisplay}</Text>
                </Text>
              </View>
              <Text style={styles.saldo}>Saldo:
              <Text style={this.state.saldo >= 0 ? styles.saldoPositivo : styles.saldoNegativo}> R$ {this.state.saldoDisplay}</Text>
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => this.props.navigation.navigate("StocksScreen")} >
          <Text style={styles.carteiraTitle}>Carteira de Investimentos</Text>
          <FlatList
            style={styles.acoes}
            data={this.state.portfolio}
            keyExtractor={(item, index) => String(item[0])}
            renderItem={
              ({ item }) => (
                <View>
                  <Card
                    titleStyle={styles.ticker}
                    iconDisable
                    title={item[0]}
                    onPress={() => { this.props.navigation.navigate("StocksScreen")}}
                    bottomRightText={"Preço Médio: R$" + item[1].PM}
                    bottomRightStyle={styles.PM}
                    topRightText={item[1].Empresa}
                    topRightStyle={styles.nomeEmpresa}
                    content={"Quantidade: " + item[1].quantidade}
                  />
                </View>
              )
            }
          />
          </TouchableOpacity>

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
      </View>
    );
  }
}

export default HomeScreen;
