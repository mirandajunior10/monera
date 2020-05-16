import React from 'react';
import { Platform, StatusBar } from 'react-native';
import { Icon } from "react-native-elements";
import BurgerMenu from "../components/BurgerMenu"
import HomeScreen from '../screens/Home';
import LoadingScreen from '../screens/Loading';
import PaymentsScreen from '../screens/Payments';
import PasswordResetScreen from '../screens/PasswordReset';
import RegisterScreen from '../screens/Register';
import LoginScreen from '../screens/Login';
import TransactionsScreen from '../screens/Transactions'
import TransferScreen from '../screens/Transfer'
import { createStackNavigator } from 'react-navigation-stack'; // Remember to import the other navigators later
import { createSwitchNavigator, createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createDrawerNavigator } from "react-navigation-drawer";

//const IOS_MODAL_ROUTES = ["OptionsScreen"];


//Função pra transição dinâmica, para lidar com IOS e Android - não utilizado
/* let dynamicModalTransition = (transitionProps, prevTransitionProps) => {
    const isModal = IOS_MODAL_ROUTES.some(
        screenName =>
            screenName === transitionProps.scene.route.routeName ||
            (prevTransitionProps &&
                screenName === prevTransitionProps.scene.route.routeName)
    );
    return StackViewTransitionConfigs.defaultTransitionConfig(
        transitionProps,
        prevTransitionProps,
        isModal
    );
}; */


const PaymentsStack = createStackNavigator(
    { PaymentsScreen: PaymentsScreen });

 
  PaymentsStack.navigationOptions = {
    tabBarLabel: "Pagamentos",
    tabBarIcon: ({ tintColor }) => <Icon name="ios-barcode" type="ionicon" color={"white"} />,
    drawerLabel: "Pagamentos",
    drawerIcon: ({ tintColor }) => <Icon name="md-barcode" type="ionicon" color={"white"} />,
  };
  
const TransactionStack = createStackNavigator(
    { TransactionsScreen: TransactionsScreen }, {
      headerMode: "none",
    });

TransactionStack.navigationOptions = {
    
    tabBarLabel: "Transações",
    tabBarIcon: ({ tintColor }) => <Icon name="ios-paper" type="ionicon" color={'white'} />,
    drawerLabel: "Transações",
    drawerIcon: ({ tintColor }) => <Icon name="md-paper" type="ionicon" color={'white'} />,
  };

  const TransferStack = createStackNavigator(
    { TransferScreen: TransferScreen }, {
      headerMode: "none",
    });

    TransferStack.navigationOptions = {
    
    tabBarLabel: "Transferência",
    tabBarIcon: ({ tintColor }) => <Icon name="ios-redo" type="ionicon" color={'white'} />,
    drawerLabel: "Transferência",
    drawerIcon: ({ tintColor }) => <Icon name="md-redo" type="ionicon" color={'white'} />,
  };  

 const HomeStack = createStackNavigator(
    { HomeScreen: HomeScreen }, {
      headerMode: "none",
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

      
const MainNavigator = Platform.select({
    ios: createBottomTabNavigator({ HomeStack, TransactionStack, TransferStack, PaymentsStack }),
    android: createDrawerNavigator({ HomeStack, TransactionStack, TransferStack, PaymentsStack }, 
        {
            drawerType: "back",
            drawerBackgroundColor: '#00C79C',
            drawerType: 'back',
            contentOptions: {
                labelStyle: {
                    color: 'white',
                    textAlign: 'left',

                },
              
              },
              contentComponent: BurgerMenu
        }
    )
});

const LoginStack = createStackNavigator({ LoginScreen, PasswordResetScreen });

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

const AuthTabs = createBottomTabNavigator({ LoginStack, RegisterScreen });  

const RootSwitch = createSwitchNavigator({ LoadingScreen, AuthTabs, MainNavigator });

export default createAppContainer(RootSwitch);

