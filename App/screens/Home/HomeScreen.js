import styles from './styles';
import React, { Component } from 'react';
import { Text, View, FlatList, TouchableOpacity } from 'react-native';
import { Card } from "@paraboly/react-native-card";
import { FloatingAction } from 'react-native-floating-action';
import actions from './actions'
import { handleAction, fecthStocks, getStocks, fetchTransactions, handleStocks } from "./functions";
import Icon from 'react-native-vector-icons/Ionicons';
import { database, auth } from '../../config/config';
import { AddReceita, AddDespesa, AddAcao } from '../../components/Overlay'

// chave pra alphaVantage 1T892FN50JQK75LM

class HomeScreen extends Component {

  static navigationOptions = ({ navigation }) => {
    return {
      headerLeft: (
        <Icon name="md-menu" style={styles.menu} onPress={() => navigation.toggleDrawer()} />
      ),
      title: 'Minhas finanças',
      headerTitleStyle: styles.title,
    }

  };

  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      portfolio: [],
      stocks: [],
      valor: '',
      quantidade: '',
      modalVisible: false,
      dialogVisible: false,
      receitaOverlay: false,
      despesaOverlay: false,
      stocksSuggestions: [],
      selectedStock: '',
      selected: false,
      saldoDisplay: '0',
      receitaDisplay: '0',
      despesaDisplay: '0',
      userId: '',
      data: '',
      investimentoTotalDisplay: '0.00'
    };

    fecthStocks(this);

  }

  componentDidMount() {

    let that = this
    database.ref('users/' + auth.currentUser.uid + '/transactions').on('value', function (snapshot) {
      if (!auth.currentUser) return
      fetchTransactions(that, snapshot)
    }, function (errorObject) {
      console.log("The read failed: " + errorObject.code);
    })

    database.ref('users/' + auth.currentUser.uid + '/stocks').on('value', function (snapshot) {
      if (!auth.currentUser) return
      handleStocks(that, snapshot)
    }, function (errorObject) {
      console.log("The read failed: " + errorObject.code);
    })

  }

  componentWillUnmount() {
    if (auth.currentUser)
      database.ref('users/' + auth.currentUser.uid + '/transactions').off();
  }


  render() {

    return (
      <View style={styles.container}>
        <View style={styles.content}>

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

          <TouchableOpacity onPress={() => this.props.navigation.navigate("StocksScreen")}>
            <Text style={styles.carteiraTitle}>Carteira de Investimentos</Text>
            <Text style={styles.carteiraSubtitle}>Patrimônio total investido: R$ {this.state.investimentoTotalDisplay}</Text>
            <FlatList
              style={styles.acoes}
              data={this.state.portfolio}
              keyExtractor={(item, index) => String(item[0])}
              renderItem={
                ({ item }) => (
                  <Card
                    titleStyle={styles.ticker}
                    iconDisable
                    title={item[0]}
                    titleStyle={[styles.textStyle, styles.ticker]}
                    topRightText={item[1].empresa}
                    topRightStyle={[styles.textStyle, styles.nomeEmpresa]}
                    onPress={() => { this.props.navigation.navigate("StocksScreen") }}
                    bottomRightText={"Preço Médio: R$" + Number(item[1].PM).toFixed(2).replace('.', ',')}
                    bottomRightStyle={styles.precoMedio}
                    contentStyle={styles.quantidade}
                    content={"Quantidade: " + item[1].quantidade}
                  />
                )
              }
            />
          </TouchableOpacity>

        </View>
        <FloatingAction
          overlayColor={'rgba(0, 0, 0, 0.2)'}
          actions={actions}
          color='#FBE158'
          onPressItem={
            (name) => {
              handleAction(this, name);
            }
          }
        />

        <AddAcao
          styles={styles}
          context={this}
          getStocks={getStocks}
        />

        <AddReceita
          styles={styles}
          context={this}
        />

        <AddDespesa
          styles={styles}
          context={this}
        />
      </View>
    );
  }
}

export default HomeScreen;
