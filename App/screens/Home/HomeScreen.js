import styles from './styles';
import React, { Component } from 'react';
//import { Icon } from "react-native-elements";
import { Text, View, FlatList, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { Card } from "@paraboly/react-native-card";
import { FloatingAction } from 'react-native-floating-action';
import actions from './actions'
import { fetchUserData, fecthStocks, getStocks, fetchTransactions } from "./functions";
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
      userData: {},
      portfolio: [],
      stocks: [],
      modalVisible: false,
      stocksSuggestions: [],
      selectedStock: '',
      selected: false,
      saldoDisplay: '0',
      receitaDisplay: '0',
      despesaDisplay: '0',
      userId: ''
    };

    fecthStocks(this);

  }

  componentDidMount() {

    fetchUserData(this);
    let that = this
    database.ref('users/' + auth.currentUser.uid + '/transactions').on('value', function (snapshot) {
      if(!auth.currentUser) return
      fetchTransactions(that, snapshot)
    }, function (errorObject) {
      console.log("The read failed: " + errorObject.code);
    })

  }

  componentWillUnmount(){
    if(auth.currentUser)
    database.ref('users/' + auth.currentUser.uid + '/transactions').off();
  }

  onClose = () => {
    this.state.stocksSuggestions = []
    this.setState({ modalVisible: false });
  }
  handleAction(name) {
    switch (name) {
      case 'bt_nova_ordem':
        this.setState({ modalVisible: true })
        break;
      default:
        break;
    }
  }
  render() {

    const dados = [
      { id: "00", name: "Relâmpago McQueen" },
      { id: "01", name: "Agente Tom Mate" },
      { id: "02", name: "Doc Hudson" },
      { id: "03", name: "Cruz Ramirez" }
    ];

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
            style={StyleSheet.absoluteFill}
            visible={this.state.modalVisible}
            closeOnTouchOutside
            onClose={this.onClose}
            animationType="zoomIn"
            containerStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.35)', height: 50 }}
            childrenWrapperStyle={{ backgroundColor: '#eee', height: 190 }}
            animationDuration={250}>
            <Autocomplete
              autoCapitalize="none"
              hideResults={this.state.selected}
              keyExtractor={(item, index) => index.toString()}
              autoCorrect={false}
              containerStyle={styles.autocompleteContainer}
              data={this.state.stocksSuggestions}
              defaultValue={this.state.selectedStock}
              onChangeText={text => getStocks(this, text)}
              placeholder="Digite o ticker completo de uma ação"
              renderItem={({ item }) => (

                //you can change the view you want to show in suggestion from here
                <TouchableOpacity onPress={() => this.setState({ selectedStock: item.symbol.split('.')[0], selected: true })}>
                  <Text style={styles.itemText}>
                    {item.symbol.split('.')[0]}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </Overlay>

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
                    onPress={() => { }}
                    bottomRightText={"Preço Médio: R$" + item[1].PM}
                    bottomRightStyle={styles.PM}
                    topRightText={item[1].Empresa}
                    topRightStyle={styles.nomeEmpresa}
                    content={"Quantidade: " + item[1].Quantidade}
                  />
                </View>
              )
            }
          />
        </View>
        <FloatingAction
          //overrideWithAction={true}
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
