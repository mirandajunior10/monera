import styles from './styles';
import React, { Component } from 'react';
import { Icon } from "react-native-elements";
import { Text, View, FlatList, TouchableOpacity } from 'react-native';
import PureChart from 'react-native-pure-chart';
import { auth, database } from '../../config/config';
import { Card } from "@paraboly/react-native-card";
import { FloatingAction } from 'react-native-floating-action';

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
      stocks: [],
      actions: [{
        text: 'Nova ordem',
        icon: <Icon
          name="md-add"
          type="ionicon"
          color="white" />,
        name: 'bt_nova_ordem',
        color: '#FBE158',
        position: 1
      }]

    };
  }

  UNSAFE_componentWillMount() {
    auth.onAuthStateChanged(user => {
      if (user) {
        this.setState({ isLoggedIn: true })
        var that = this
        database.ref('users/' + user.uid).once("value").then(function (snapshot) {

          var stocks = Object.entries(snapshot.val().stocks);
          stocks.map((stock) => (
            {
              index: stock[0],
              item: stock[1]
            }));

          that.setState({
            userData: snapshot.val(),
            stocks
          });

        }).catch(function (error) {
          console.log(error)

        });


      } else {
        this.setState({ isLoggedIn: false })
      }
    });
  }



  render() {

    let sampleData = [
      {
        id: 1,
        seriesName: 'series1',
        data: [
          { x: '2018-02-01', y: 30 },
          { x: '2018-02-02', y: 200 },
          { x: '2018-02-03', y: 170 },
          { x: '2018-02-04', y: 250 },
          { x: '2018-02-05', y: 10 }
        ],
        color: '#297AB1'
      },
      {
        id: 2,
        seriesName: 'series2',
        data: [
          { x: '2018-02-01', y: 20 },
          { x: '2018-02-02', y: 100 },
          { x: '2018-02-03', y: 140 },
          { x: '2018-02-04', y: 550 },
          { x: '2018-02-05', y: 40 }
        ],
        color: 'yellow'
      }
    ]
    return (
      <View style={styles.container}>
        <PureChart
          data={sampleData}
          type='bar'

        />
        <FlatList
          style={styles.acoes}
          horizontal={false}
          data={this.state.stocks}
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
        actions={this.state.actions}
        color='#00C79C'
        onPressItem={
          (name) => {
            console.log(`selected button: ${name}`);
          }
        }
      />
      </View>
    );
  }
}

export default HomeScreen;
