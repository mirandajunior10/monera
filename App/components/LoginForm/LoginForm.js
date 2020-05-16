import styles from "./styles";
import React, { Component } from "react";
import { View, Image, Text } from "react-native";
import { Button, Input } from "react-native-elements";
import Logo from "../../../assets/logo.png";
import { Formik } from "formik";
import { object as yupObject, string as yupString } from "yup";
import { auth } from '../../config/config';

class LoginForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false

    };
  }

  handleSubmit = async (values, formikBag) => {

    //Force user to login
    var email = values.email;
    var password = values.password;

    if (email != '' && password != '') {
      formikBag.setSubmitting(true);
      try {
        let logInInfo = await auth.signInWithEmailAndPassword(email, password); //'test@user.com', 'password'
 
        formikBag.setSubmitting(false);
        this.props.navigation.navigate("HomeScreen");


      } catch (error) {

        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(error.code);

        switch (errorCode) {
          case "auth/user-not-found":
            errorMessage = "Usuário não encontrado"
            break;

          case "auth/wrong-password":
            errorMessage = "Senha incorreta"
            break;
          default:
            break;
        }

        alert(errorMessage);

      }


    } else {
      alert('email or password is empty..')
    }
  };


  renderForm = (
    {
      values,
      handleSubmit,
      setFieldValue,
      touched,
      isValid,
      errors,
      setFieldTouched,
      isSubmitting
    }) => (
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image
            source={Logo}
            style={styles.logo}>
          </Image>
          <Text style={styles.textLogo}>Monera</Text>
        </View>

        <Input
          containerStyle={styles.inputContainer}
          placeholder="Email address"
          keyboardType="email-address"
          autoCapitalize="none"
          value={values.email}
          onChangeText={value => setFieldValue("email", value)}
          onBlur={() => setFieldTouched("email")}
          editable={!isSubmitting}
          errorMessage={touched.email && errors.email ? errors.email : undefined}
        />

        <Input
          containerStyle={styles.inputContainer}
          placeholder="Password"
          secureTextEntry
          autoCapitalize="none"
          value={values.password}
          onChangeText={value => setFieldValue("password", value)}
          onBlur={() => setFieldTouched("password")}
          editable={!isSubmitting}
          errorMessage={touched.password && errors.password ? errors.password : undefined}
        />
      
        <Button
          title={"Login"}
          containerStyle={styles.loginButtonContainer}
          buttonStyle={styles.loginButton}
          disabledStyle={styles.disabled}
          titleStyle={styles.loginButtonTitle}
          disabledTitleStyle={styles.loginButtonTitle}
          onPress={handleSubmit}
          disabled={!isValid || isSubmitting}
          loading={isSubmitting}
          loadingProps={{ size: "large", color: "white" }}
        />

        <Button
          type="clear"
          title="Forgot Password?"
          containerStyle={styles.forgottenPasswordButtonContainer}
          titleStyle={styles.forgottenPasswordTitle}
          onPress={() => this.props.navigation.navigate("PasswordResetScreen")}
        />
        <Button
          type="clear"
          title="Cadastrar"
          containerStyle={styles.registerButtonContainer}
          titleStyle={styles.registerTitle}
          onPress={() => this.props.navigation.navigate("RegisterScreen")}
        />

      </View>
    );

  render() {
    return (
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={(values, formikBag) =>
          this.handleSubmit(values, formikBag)
        }
        validationSchema={yupObject().shape({
          email: yupString()
            .email("Email is invalid")
            .required("Email is required"),
          password: yupString()
            .min(8, "Password must be at least 8 characters")
            .required("Password is required")
        })}
      >
        {(formikBag) => this.renderForm(formikBag)}
      </Formik>
    )
  }
}

export default LoginForm;