import styles from "./styles";
import React, { Component } from "react";
import { Platform } from "react-native";
import { Icon } from "react-native-elements";
import RegisterForm from "../../components/RegisterForm";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

class RegisterScreen extends Component {

    static navigationOptions = {
        tabBarLabel: "Register",
        tabBarIcon: ({ tintColor }) => {
            let iconName = Platform.select({ ios: "ios-person-add", android: "md-person-add" });
            return <Icon name={iconName} type="ionicon" color={tintColor} />;
        }
    };

    render() {
        return (
            <KeyboardAwareScrollView
                style={{ backgroundColor: '#white' }}
                resetScrollToCoords={{ x: 0, y: 0 }}
                contentContainerStyle={styles.container}
                scrollEnabled={false}
            >
                <RegisterForm navigation={this.props.navigation} />
            </KeyboardAwareScrollView>
        );
    }
}

export default RegisterScreen;
