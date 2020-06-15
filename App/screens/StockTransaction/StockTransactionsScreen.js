import styles from './styles';
import React, { Component } from 'react';
import { Animated, View, Text, FlatList, Alert, TextInput } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Button } from "react-native-elements";
import Icon from 'react-native-vector-icons/Ionicons';
import { FloatingAction } from 'react-native-floating-action';
import { handleAddTransaction, handleAction, handleCancel, handleDate, deleteTransaction, fetchTransactions, handleTransactions, validateInput, confirmDelete } from './functions';
import Overlay from 'react-native-modal-overlay';
import Swipeable from "react-native-gesture-handler/Swipeable";
import { RectButton } from 'react-native-gesture-handler';
const AnimatedIcon = Animated.createAnimatedComponent(Icon);

class StockTransactionsScreen extends Component {


  static navigationOptions = ({ navigation }) => {
    return {
      headerLeft: (
        <Icon name="md-arrow-back" style={styles.menu} onPress={() => this.props.navigation.pop()} />
      ),
      title: navigation.state.params.ticker,
      headerTitleStyle: styles.title,
    }

  };

  constructor(props) {
    super(props);

    this.state = {
      modalVisible: false,
      transactions: [],
      valor: '',
      descricao: '',
      data: '',
      isLoggedIn: true,
      saldo: 0,
      saldoDisplay: '0',
      refreshing: false,
      ticker: props.navigation.state.params.ticker,
      stockData: props.navigation.state.params.transactions,
      transactions: [],
      actions: []

    };
    this._rowRefs = []
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
  componentDidMount() {
    var actions = actions = [{
      text: 'Adicionar ' + this.state.ticker,
      icon: <Icon
        name="md-add"
        type="ionicon"
        color="white" />,
      name: 'add_compra',
      color: '#FBE158',
      position: 1
    }]
    this.setState({ actions })
    handleTransactions(this, this.state.stockData)
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

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.posicaoContainer} >
            <Text style={styles.saldo}>Posição Total:
              <Text style={styles.valor}> R$ {this.state.saldoDisplay}</Text>
            </Text>
          </View>

          <View style={styles.transacoesContainer}>
            <FlatList
              refreshing={this.state.refreshing}
              onRefresh={() => fetchTransactions(this)}
              style={styles.transacoesContainer}
              data={this.state.transactions}
              keyExtractor={(item, index) => String(index)}
              ListEmptyComponent={<Text>Não tem nada aqui</Text>}
              showsVerticalScrollIndicator={false}
              renderItem={
                ({ item }) => (
                  <View style={styles.itensContainer}>
                    <Swipeable
                      ref={this.updateRef}
                      renderRightActions={(progress, dragX) =>
                        <this.RightActions
                          progress={progress}
                          dragX={dragX}
                          onPress={() => {
                            this.close()
                            confirmDelete(item, this)
                          }
                          } />
                      }
                    >
                      <View style={{ backgroundColor: '#fff' }}>
                        <View style={styles.itemTop}>
                          <Text style={[styles.textStyle, styles.ticker]}>{item[1].descricao}</Text>
                          <Text style={[styles.textStyle, styles.nomeEmpresa]}>{"R$ " + item[1].valorDisplay}</Text>
                        </View>
                        <View style={styles.itemBottom}>
                          <Text style={styles.data}>{item[1].data}</Text>
                          <Text style={styles.data}>Quantidade: {item[1].quantidade}</Text>
                        </View>
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
            //childrenWrapperStyle={styles.overlayWrapper}
            animationDuration={200}>

            <Text style={styles.titleOverlay}>Adicionar {this.state.ticker}</Text>

            <Text style={styles.inputTitle}>Quantidade</Text>
            <TextInput
              keyboardType={"number-pad"}
              style={styles.inputText}
              value={this.state.quantidade}
              onChangeText={(text) => this.setState({ quantidade: text })}
            />

            <Text style={styles.inputTitle}>Valor</Text>
            <TextInput
              keyboardType={"number-pad"}
              style={styles.inputText}
              value={this.state.valor}
              onChangeText={(text) => this.setState({ valor: text })}
            />

            <Text style={styles.inputTitle}>Data</Text>
            <TextInput
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
                titleStyle={styles.buttonTitle}
                disabledTitleStyle={styles.buttonTitle}
                onPress={() => {
                  if (validateInput(this) === true) handleAddTransaction(this, 1)
                }}
              />
            </View>

            {/* <Button
              title={"Inserir"}
              buttonStyle={styles.overlayButton}
              titleStyle={styles.buttonTitle}
              disabledTitleStyle={styles.buttonTitle}
              onPress={() => {
                if (validateInput(this) === true) handleAddTransaction(this, 1)
              }}

            /> */}
          </Overlay>

        </View>
        <FloatingAction
          overlayColor={'none'}
          actions={this.state.actions}
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

export default StockTransactionsScreen;