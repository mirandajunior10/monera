import styles from "./styles";
import React, { Component } from "react";
import { View, Image, KeyboardAvoidingView, TouchableWithoutFeedback, TextInput, Keyboard } from "react-native";
import { Button } from "react-native-elements";
import Logo from "../../../assets/logo.png";
import { Formik } from "formik";
import { object as yupObject, string as yupString } from "yup";
import { handleSubmit } from "./functions";

class LoginForm extends Component {

  constructor(props) {
    super(props);
  }

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
      <KeyboardAvoidingView style={styles.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

          <View style={styles.inner}>

            {/* Logo Monera */}
            <View style={styles.logoContainer}>
              <Image
                source={Logo}
                style={styles.logo}>
              </Image>
            </View>

            {/* Inputs do cadastro*/}
            <TextInput
              containerStyle={styles.formContainer}
              style={styles.inputText}
              placeholder="Email address"
              keyboardType="email-address"
              autoCapitalize="none"
              value={values.email}
              onChangeText={value => setFieldValue("email", value)}
              onBlur={() => setFieldTouched("email")}
              editable={!isSubmitting}
              errorMessage={touched.email && errors.email ? errors.email : undefined}
            />

            <TextInput
              containerStyle={styles.formContainer}
              style={styles.inputText}
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
              title={"Entrar"}
              containerStyle={styles.buttonContainer}
              buttonStyle={styles.loginButton}
              disabledStyle={styles.disabled}
              titleStyle={styles.buttonTitle}
              disabledTitleStyle={styles.buttonTitle}
              onPress={handleSubmit}
              disabled={!isValid || isSubmitting}
              loading={isSubmitting}
              loadingProps={{ size: "large", color: "white" }}
            />
            {/*Fim dos inputs*/}
            <Button
              type="clear"
              title="Esqueci minha senha"
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
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>

    );

  render() {
    return (
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={(values, formikBag) =>
          handleSubmit(values, formikBag, this)
        }
        validationSchema={yupObject().shape({
          email: yupString()
            .email("Email inválido")
            .required("O email é obrigatório"),
          password: yupString()
            .min(8, "A senha precisa ter, no mínimo, 8 caracteres")
            .required("A senha é obrigatória")
        })}
      >
        {(formikBag) => this.renderForm(formikBag)}
      </Formik>
    )
  }
}

export default LoginForm;