import styles from './styles';
import React, { Component } from 'react';
import { Button } from "react-native-elements";
import { Animated, View, Text, FlatList, Alert, TextInput } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import actions from './actions';
import Icon from 'react-native-vector-icons/Ionicons';
import { FloatingAction } from 'react-native-floating-action';
import { handleAddTransaction, handleAction, handleCancel, handleDate, deleteTransaction, handleSnapshot, fetchTransactions } from './functions';
import { database, auth } from '../../config/config';
import Swipeout from 'react-native-swipeout';
import Overlay from 'react-native-modal-overlay';
import Swipeable from "react-native-gesture-handler/Swipeable";
import { RectButton } from 'react-native-gesture-handler';
const AnimatedIcon = Animated.createAnimatedComponent(Icon);
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
    let that = this
    database.ref('users/' + auth.currentUser.uid).on("value", function (snapshot) {
      if (!auth.currentUser) return
      that.setState({ refreshing: true })
      handleSnapshot(that, snapshot)
      that.setState({ refreshing: false })

    }, function (errorObject) {
      console.log("The read failed: " + errorObject.code);
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

          <View style={styles.transacoesContainer}>
            <FlatList
              refreshing={this.state.refreshing}
              onRefresh={() => fetchTransactions(this)}
              data={this.state.transactions}
              keyExtractor={(item, index) => String(index)}
              ListEmptyComponent={<Text style={styles.emptyList}>Você não realizou transações ainda :)</Text>}
              showsVerticalScrollIndicator={false}
              renderItem={
                ({ item }) => (

                  <View style={styles.itensContainer}>
                    <Swipeable
                      renderRightActions={(progress, dragX) => <this.RightActions progress={progress} dragX={dragX} onPress={() => { deleteTransaction(item, this) }
                      } />
                      }
                    >
                      <View style={{ backgroundColor: '#fff' }}>
                        <View style={styles.itemTop}>
                          <Text style={item[1].valor > 0 ? [styles.textStyle, styles.receita] : [styles.textStyle, styles.despesa]}>{item[1].descricao}</Text>
                          <Text style={item[1].valor > 0 ? [styles.textStyle, styles.receita] : [styles.textStyle, styles.despesa]}>R$ {item[1].valor}</Text>
                        </View>
                        <View style={styles.itemBottom}>
                          <Text style={styles.data}>{item[1].data}</Text>
                        </View>
                      </View>
                    </Swipeable>
                  </View>
                )
              }
            />
          </View>

          <Overlay
            visible={this.state.receitaOverlay}
            closeOnTouchOutside
            onBackdropPress={() => { handleCancel(this) }}
            onBackButtonPress={() => { handleCancel(this) }}
            onDismiss={() => { handleCancel(this) }}
            onClose={() => handleCancel(this)}
            animationType="zoomIn"
            containerStyle={styles.overlayContainer}
            childrenWrapperStyle={styles.overlayWrapper}
            animationDuration={200}>

            <Text style={[styles.titleOverlay, styles.saldoPositivo]}>Inserir Receita</Text>

            <View style={styles.formContainer}>
              <Text style={styles.inputTitle}>Descrição:</Text>
              <TextInput
                placeholder="Digite a descrição"
                value={this.state.descricao}
                onChange={({ nativeEvent }) => this.setState({ descricao: nativeEvent.text })}
                autoFocus={true}
                style={styles.inputText} />

              <Text style={styles.inputTitle}>Valor:</Text>
              <TextInput
                placeholder="Digite o valor"
                value={this.state.valor}
                onChange={({ nativeEvent }) => this.setState({ valor: nativeEvent.text })}
                keyboardType="number-pad"
                style={styles.inputText} />

              <Text style={styles.inputTitle}>Data:</Text>
              <TextInput
                placeholder="Selecione a data "
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
            <View style={styles.buttonContainer}>
              <Button
                title={"Cancelar"}
                buttonStyle={styles.overlayButton}
                titleStyle={[styles.buttonTitle, styles.saldoPositivo]}
                disabledTitleStyle={styles.buttonTitle}
                onPress={() => { handleCancel(this) }}
              />
              <Button
                title={"Inserir"}
                buttonStyle={styles.overlayButton}
                titleStyle={[styles.buttonTitle, styles.saldoPositivo]}
                disabledTitleStyle={styles.buttonTitle}
                onPress={() => { handleAddTransaction(this, 1) }}
              />
            </View>
          </Overlay>

          <Overlay
            visible={this.state.despesaOverlay}
            closeOnTouchOutside
            onClose={() => handleCancel(this)}
            animationType="zoomIn"
            containerStyle={styles.overlayContainer}
            childrenWrapperStyle={styles.overlayWrapper}
            animationDuration={200}>

            <Text style={[styles.titleOverlay, styles.saldoNegativo]}>Inserir Despesa</Text>

            <View style={styles.formContainer}>
              <Text style={styles.inputTitle}>Descrição:</Text>
              <TextInput
                placeholder="Digite a descrição"
                value={this.state.descricao}
                onChange={({ nativeEvent }) => this.setState({ descricao: nativeEvent.text })}
                autoFocus={true}
                style={styles.inputText} />

              <Text style={styles.inputTitle}>Valor:</Text>
              <TextInput
                placeholder="Digite o valor"
                value={this.state.valor}
                onChange={({ nativeEvent }) => this.setState({ valor: nativeEvent.text })}
                keyboardType="number-pad"
                style={styles.inputText} />

              <Text style={styles.inputTitle}>Data:</Text>
              <TextInput
                placeholder="Selecione a data "
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
            <View style={styles.buttonContainer}>
              <Button
                title={"Cancelar"}
                buttonStyle={styles.overlayButton}
                titleStyle={[styles.buttonTitle, styles.saldoNegativo]}
                disabledTitleStyle={styles.buttonTitle}
                onPress={() => { handleCancel(this) }}
              />
              <Button
                title={"Inserir"}
                buttonStyle={styles.overlayButton}
                titleStyle={[styles.buttonTitle, styles.saldoNegativo]}
                disabledTitleStyle={[styles.buttonTitle, styles.saldoNegativo]}
                onPress={() => { handleAddTransaction(this, 2) }}
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

export default TransactionsScreen;