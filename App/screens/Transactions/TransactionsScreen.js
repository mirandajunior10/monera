import styles from './styles';
import React, { Component } from 'react';
import { Animated, View } from 'react-native';
import actions from './actions';
import Icon from 'react-native-vector-icons/Ionicons';
import { FloatingAction } from 'react-native-floating-action';
import { handleAction, handleSnapshot} from './functions';
import { database, auth } from '../../config/config';
import DataList from '../../components/DataList/DataList';
import { AddReceita, AddDespesa, AddAcao } from '../../components/Overlay'

const AnimatedIcon = Animated.createAnimatedComponent(Icon);
class TransactionsScreen extends Component {

  static navigationOptions = ({ navigation }) => {
    return {
      headerLeft: (
        <Icon name="md-menu" style={styles.menu} onPress={() => navigation.toggleDrawer()} />
      ),
      title: 'Transações',
      headerTitleStyle: styles.title,
    }

  };

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
      saldoDisplay: '0,00',
      refreshing: false,

    };
    this._rowRefs = [];

  };


  componentDidMount() {
    let that = this
    database.ref('users/' + auth.currentUser.uid).on("value", function (snapshot) {
      if (!auth.currentUser) return
      that.setState({ refreshing: true })
      handleSnapshot(that, snapshot)
      that.setState({ refreshing: false })

    }, function (errorObject) {
      console.log("Não foi possivel ler as transações: " + errorObject.code);
      //that.setState({ saldoDisplay: '0,00', transactions: []  })
    })



  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          {/*      <View style={this.state.saldo >= 0 ? [styles.saldoContainer, styles.containerPositivo] : [styles.saldoContainer, styles.containerNegativo]} >
            <Text style={styles.saldo}>Saldo disponível:
              <Text style={this.state.saldo >= 0 ? styles.saldoPositivo : styles.saldoNegativo}> R$ {this.state.saldoDisplay}</Text>
            </Text>
          </View> */}

          <View style={styles.transacoesContainer}>
            <DataList
              context={this}
              styles={styles}

            />

          </View>

          <AddReceita
            styles={styles}
            context={this}
          />

          <AddDespesa
            styles={styles}
            context={this}
          />
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