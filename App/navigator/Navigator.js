import React from 'react';
import { Platform, StatusBar } from 'react-native';
import { Icon } from "react-native-elements";
import BurgerMenu from "../components/BurgerMenu"
import Camera from '../components/Camera'

import HomeScreen from '../screens/Home';
import LoadingScreen from '../screens/Loading';
import PaymentsScreen from '../screens/Payments';
import PasswordResetScreen from '../screens/PasswordReset';
import RegisterScreen from '../screens/Register';
import LoginScreen from '../screens/Login';
import TransactionsScreen from '../screens/Transactions'
import TransferScreen from '../screens/Transfer'
import StocksScreen from '../screens/Stocks'
import StockTransactionsScreen from '../screens/StockTransaction';

import { createStackNavigator } from 'react-navigation-stack'; // Remember to import the other navigators later
import { createSwitchNavigator, createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createDrawerNavigator } from "react-navigation-drawer";

const LoginStack = createStackNavigator({ LoginScreen, PasswordResetScreen, RegisterScreen });

LoginStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }

  return {
    tabBarLabel: "Login",
    tabBarIcon: ({ tintColor }) => {
      let iconName = Platform.select({ ios: "ios-log-in", android: "md-log-in" });
      return <Icon name={iconName} type="ionicon" color={tintColor} />;
    },
    tabBarVisible
  };
};

const HomeStack = createStackNavigator(
  { HomeScreen: HomeScreen }, {
},
  {
    initialRouteName: "HomeScreen",
  });


HomeStack.navigationOptions = {
  tabBarLabel: "Home",
  tabBarIcon: ({ tintColor }) => (
    <Icon name="ios-home" type="ionicon" color={"white"} />
  ),
  drawerLabel: "Home",
  drawerIcon: ({ tintColor }) => <Icon name="md-home" type="ionicon" color={"white"} />,

};

const TransactionStack = createStackNavigator(
  { TransactionsScreen: TransactionsScreen }, {
});

TransactionStack.navigationOptions = {

  tabBarLabel: "Transações",
  tabBarIcon: ({ tintColor }) => <Icon name="ios-paper" type="ionicon" color={'white'} />,
  drawerLabel: "Transações",
  drawerIcon: ({ tintColor }) => <Icon name="md-paper" type="ionicon" color={'white'} />,
};


const TransferStack = createStackNavigator(
  { TransferScreen: TransferScreen }, {
});

TransferStack.navigationOptions = {

  tabBarLabel: "Transferência",
  tabBarIcon: ({ tintColor }) => <Icon name="ios-redo" type="ionicon" color={'white'} />,
  drawerLabel: "Transferência",
  drawerIcon: ({ tintColor }) => <Icon name="md-redo" type="ionicon" color={'white'} />,
};



const StocksStack = createStackNavigator(
  {
    StocksScreen: StocksScreen,
    StockTransactionsScreen: StockTransactionsScreen
  }, {
});

StocksStack.navigationOptions = {

  tabBarLabel: "Ações",
  tabBarIcon: ({ tintColor }) => <Icon name="ios-redo" type="ionicon" color={'white'} />,
  drawerLabel: "Ações",
  drawerIcon: ({ tintColor }) => <Icon name="md-trending-up" type="ionicon" color={'white'} />,
};



const PaymentsStack = createStackNavigator(
  { PaymentsScreen: PaymentsScreen }, {
});


PaymentsStack.navigationOptions = {
  tabBarLabel: "Pagamentos",
  tabBarIcon: ({ tintColor }) => <Icon name="ios-barcode" type="ionicon" color={"white"} />,
  drawerLabel: "Pagamentos",
  drawerIcon: ({ tintColor }) => <Icon name="md-barcode" type="ionicon" color={"white"} />,
};


const drawerNavigator = createDrawerNavigator({ HomeStack, TransactionStack, StocksStack, TransferStack, PaymentsStack },
  {
    drawerType: "back",
    drawerBackgroundColor: '#00C79C',
    drawerType: 'back',
    marginTop: StatusBar.currentHeight,
    contentOptions: {
      labelStyle: {
        color: 'white',
        textAlign: 'left'
      },

    },
    contentComponent: BurgerMenu
  }
)

const MainNavigator = createStackNavigator({ drawerNavigator, Camera },{
  headerMode: 'none',

})


const RootSwitch = createSwitchNavigator({ LoadingScreen, LoginStack, MainNavigator });

export default createAppContainer(RootSwitch);

