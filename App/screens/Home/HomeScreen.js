import styles from './styles';
import React, { Component } from 'react';
import { Icon } from "react-native-elements";
import { Text, View, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import PureChart from 'react-native-pure-chart';
import { auth } from '../../config/config';
import { Card } from "@paraboly/react-native-card";
import { FloatingAction } from 'react-native-floating-action';
import actions from './actions'
import sampleData from './sampleData'
import { fetchUserData, fecthStocks, getStocks } from "./functions";
import Overlay from 'react-native-modal-overlay';
import Autocomplete from 'react-native-autocomplete-input';

// chave pra alphaVantage 1T892FN50JQK75LM

class HomeScreen extends Component {

  static navigationOptions = ({ navigation }) => ({
    headerTitle: "Home",
    headerTintColor: "white",
    headerStyle: {
      backgroundColor: '#00C79C'
    },
    labelStyle: {
      color: 'white',
    },
    headerLeft: Platform.select({
      ios: null,
      android: (
        <Icon
          name="md-menu"
          type="ionicon"
          color="white"
          containerStyle={styles.icon}
          onPress={() => navigation.toggleDrawer()}
        />
      )
    })
  });

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
      selected: false

    };

    fecthStocks(this);

  }

  componentDidMount() {
    auth.onAuthStateChanged(user => {
      if (user) {
        this.setState({ isLoggedIn: true })
        //var that = this;
        fetchUserData(user, this);


      } else {
        this.setState({ isLoggedIn: false })
      }
    });


  }

  onClose = () => {
    this.state.stocksSuggestions = []
    this.setState({ modalVisible: false });
  }

  render() {

    return (
      <View style={styles.container}>
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
              <TouchableOpacity onPress={() => this.setState({ selectedStock: item.symbol.split('.')[0], selected:true })}>
                <Text style={styles.itemText}>
                  {item.symbol.split('.')[0]}
                </Text>
              </TouchableOpacity>
            )}
          />
        </Overlay>

        <PureChart
          data={sampleData}
          type='bar'
        />
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
        <FloatingAction
          overrideWithAction={true}
          actions={actions}
          color='#00C79C'
          onPressItem={
            (name) => {
              this.setState({ modalVisible: true })
            }
          }
        />
      </View>
    );
  }
}

export default HomeScreen;
