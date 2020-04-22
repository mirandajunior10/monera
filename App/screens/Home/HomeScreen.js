import styles from './styles';
import React, { Component } from 'react';
import { Icon } from "react-native-elements";
import { Text, View, FlatList, TouchableOpacity } from 'react-native';
import PureChart from 'react-native-pure-chart';
import { auth, database } from '../../config/config';
import { Card } from "@paraboly/react-native-card";

class HomeScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      userData: {},
      stocks: []

    };
  }

  UNSAFE_componentWillMount() {
    auth.onAuthStateChanged(user => {
      if (user) {
        this.setState({ isLoggedIn: true })
        var that = this
        database.ref('users/' + user.uid).once("value").then(function (snapshot) {
          const stocks = Object.entries(snapshot.val().stocks);
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

  static navigationOptions = ({ navigation }) => ({
    headerTitle: "Home",
    headerTintColor: "white",
    headerStyle: {
      backgroundColor: '#26c877'
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
        <PureChart data={sampleData} type='bar' />
        <FlatList
          style={styles.acoes}
          horizontal={false}
          numColumns={2}
          data={this.state.stocks}
          keyExtractor={(item, index) => String(item[0])}
          renderItem={
            ({ item }) => (
              <View >
                {console.log(item)}
                <Card
                  iconDisable
                  title={item[0]}
                  onPress={() => { }}
                  bottomRightText={"Preço Médio: " + item[1]['PM']}
                  topRightText={item[1]['Empresa']}
                  content={"Quantidade: " + item[1]['Quantidade']} 
                />


              </View>

            )
          }
        />
      </View>
    );
  }
}

export default HomeScreen;
