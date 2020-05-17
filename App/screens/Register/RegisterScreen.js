import styles from "./styles";
import React, { Component } from "react";
import { Platform } from "react-native";
import { Icon } from "react-native-elements";
import RegisterForm from "../../components/RegisterForm";

class RegisterScreen extends Component {

    static navigationOptions = {
        header: null,
        tabBarLabel: "Register",
        tabBarIcon: ({ tintColor }) => {
            let iconName = Platform.select({ ios: "ios-person-add", android: "md-person-add" });
            return <Icon name={iconName} type="ionicon" color={tintColor} />;
        }
    };

    render() {
        return (
                <RegisterForm navigation={this.props.navigation} />
        );
    }
}

export default RegisterScreen;
