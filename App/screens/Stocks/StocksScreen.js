import styles from './styles';
import React, { Component } from 'react';
import { Button } from "react-native-elements";
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import actions from './actions';
import Icon from 'react-native-vector-icons/Ionicons';
import { FloatingAction } from 'react-native-floating-action';
import { Card } from "@paraboly/react-native-card";
import { handleAddTransaction, handleAction, handleDate, fetchPortfolio, handleSnapshot, fecthStocks, getStocks } from './functions';
import { database, auth } from '../../config/config';
import Overlay from 'react-native-modal-overlay';
import Autocomplete from 'react-native-autocomplete-input';

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
      saldoDisplay: '0,00',
      refreshing: false,
      selected: false,
      selectedStock: '',
      stocksSuggestions: [],
      allowed: true
    };

    fecthStocks(this);

  };
  onClose = () => {
    this.state.stocksSuggestions = []
    this.setState({ modalVisible: false, selectedStock: '' });
  }

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
            <Text style={styles.title}>Carteira de Investimentos</Text>
          </View>
        </View>
        <View style={styles.content}>
          <View style={this.state.saldo >= 0 ? [styles.saldoContainer, styles.containerPositivo] : [styles.saldoContainer, styles.containerNegativo]} >
            <Text style={styles.saldo}>Investimento total:
              <Text style={this.state.saldo >= 0 ? styles.saldoPositivo : styles.saldoNegativo}> R$ {this.state.saldoDisplay}</Text>
            </Text>
          </View>

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

                <View style={{ backgroundColor: 'white', flexDirection: "column" }}>
                  <Card
                    iconDisable
                    onPress={() => { }}
                    title={item[0]}
                    titleStyle={[styles.textStyle, styles.ticker]}
                    topRightText={item[1].Empresa}
                    topRightStyle={[styles.textStyle, styles.nomeEmpresa]}
                    content={"Quantidade: " + item[1].Quantidade}
                    contentStyle={styles.data}
                    bottomRightText={"Preço Médio: R$" + item[1].PM}
                    bottomRightStyle={styles.PM}

                  />
                </View>
              )
            }
          />
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
                  <Text>
                    {item.symbol.split('.')[0]}
                  </Text>
                </TouchableOpacity>
              )}
            />


            {<Button
              title={"Inserir"}
              buttonStyle={styles.overlayButton}
              titleStyle={styles.buttonTitle}
              disabledTitleStyle={styles.buttonTitle}
              

            />}
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