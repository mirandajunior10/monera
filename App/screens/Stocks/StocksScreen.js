import styles from './styles';
import React, { Component } from 'react';
import { Button } from "react-native-elements";
import { Animated, View, Text, FlatList, TouchableOpacity, TextInput, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import actions from './actions';
import Icon from 'react-native-vector-icons/Ionicons';
import { FloatingAction } from 'react-native-floating-action';
import { handleAddTransaction, handleAction, handleDate, fetchPortfolio, handleSnapshot, fecthStocks, getStocks, validateInput, deleteTransaction, confirmDelete } from './functions';
import { database, auth } from '../../config/config';
import Overlay from 'react-native-modal-overlay';
import Autocomplete from 'react-native-autocomplete-input';
import { handleCancel } from './functions';
import Swipeable from "react-native-gesture-handler/Swipeable";
import Ripple from 'react-native-material-ripple';
import { RectButton } from 'react-native-gesture-handler';

const AnimatedIcon = Animated.createAnimatedComponent(Icon);

class StocksScreen extends Component {

  static navigationOptions = ({ navigation }) => {
    return {
      headerLeft: (
        <Icon name="md-menu" style={styles.menu} onPress={() => navigation.toggleDrawer()} />
      ),
      title: 'Investimentos',
      headerTitleStyle: styles.title,
    }

  };


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
      show: false,
    };
    this._rowRefs = [];

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
      console.log("Não foi possível ler os ativos: " + error.code);
    })
  }


  RightActions = ({ progress, dragX, onPress }) => {
    const scale = dragX.interpolate({
      inputRange: [-80, 0],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });
    return (

      <RectButton style={styles.rightAction} onPress={onPress}>
        <AnimatedIcon
          name="md-trash"
          size={30}
          color="#fff"
          style={[styles.actionIcon, { transform: [{ scale }] }]}
        />
      </RectButton>

    );
  };
  updateRef = ref => {
    this._rowRefs.push(ref);
  };
  close = () => {
    this._rowRefs.forEach(item => {
      if (item !== null)
        item.close()
    })
  };


  render() {
    return (
      <View style={styles.container}>
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
              ListEmptyComponent={<Text style={styles.emptyList}>Você ainda não possui investimentos :´(</Text>}
              showsVerticalScrollIndicator={false}
              renderItem={
                ({ index, item }) => (

                  <View
                    style={styles.itensContainer}>
                    <Swipeable
                      ref={this.updateRef}
                      renderRightActions={(progress, dragX) =>
                        <this.RightActions progress={progress} dragX={dragX}
                          onPress={() => {
                            this.close()
                            confirmDelete(item)
                          }
                          } />
                      }
                    >

                      <View style={{ backgroundColor: '#fff' }}>
                        <Ripple
                          onPress={() => { this.props.navigation.navigate("StockTransactionsScreen", { transactions: item[1].transactions, ticker: item[0] }) }}
                          rippleColor={'#007bff'}
                          rippleOpacity={0.1}
                        >

                          <View style={styles.itemTop}>
                            <Text style={[styles.textStyle, styles.ticker]}>{item[0]}</Text>
                            <Text style={[styles.textStyle, styles.nomeEmpresa]}>{item[1].empresa}</Text>
                          </View>
                          <View style={styles.itemBottom}>
                            <Text style={styles.data}>{"Quantidade: " + item[1].quantidade}</Text>
                            <Text style={styles.data}>{"Preço Médio: R$" + item[1].PMDisplay}</Text>
                          </View>

                        </Ripple>
                      </View>
                    </Swipeable>

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
            //childrenWrapperStyle={[styles.overlayWrapper, styles.overlayWrapperAcao]}
            animationDuration={200}>

            <Text style={styles.titleOverlay}>Inserir ação</Text>
            <View style={styles.autoCompleteView}>
              <Text style={[styles.inputTitle, styles.inputTitle2]}>Código da ação</Text>
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
              <Text style={[styles.inputTitle, styles.inputTitle2]}>Quantidade</Text>
              <TextInput
                placeholder="Digite a quantidade"
                keyboardType={"number-pad"}
                value={this.state.quantidade}
                onChangeText={(text) => this.setState({ quantidade: text })}
                style={styles.inputText} />

              <Text style={[styles.inputTitle, styles.inputTitle2]}>Valor</Text>
              <TextInput
                placeholder="Digite o valor da ação"
                keyboardType={"number-pad"}
                value={this.state.valor}
                onChangeText={(text) => this.setState({ valor: text })}
                style={styles.inputText} />

              <Text style={[styles.inputTitle, styles.inputTitle2]}>Data</Text>
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
            <View style={[styles.buttonContainer, styles.buttonContainer2]}>
              <Button
                title={"Cancelar"}
                buttonStyle={styles.overlayButton}
                titleStyle={[styles.buttonTitle, styles.buttonTitle2]}
                disabledTitleStyle={styles.buttonTitle}
                onPress={() => { handleCancel(this) }}
              />
              <Button
                title={"Inserir"}
                buttonStyle={styles.overlayButton}
                titleStyle={[styles.buttonTitle, styles.buttonTitle2]}
                disabledTitleStyle={styles.buttonTitle}
                onPress={() => { handleAddTransaction(this, 1) }}
              />
            </View>

          </Overlay>
        </View>
        <FloatingAction
          actions={actions}
          color='#007bff'
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