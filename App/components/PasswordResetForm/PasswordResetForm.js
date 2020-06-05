import styles from "./styles";
import { Formik } from "formik";
import React, { Component } from "react";
import { Alert, View } from "react-native";
import { Button, Input } from "react-native-elements";
import { object as yupObject, string as yupString } from "yup";
import { auth } from '../../config/config';

export default class PasswordResetForm extends Component {

  handleSubmit = async (values, formikBag) => {
    formikBag.setSubmitting(true);
    // Here you would usually make a call to your API for a login.
    if (values.email !== '') {
      try {
        var result = await auth.sendPasswordResetEmail(values.email);
        Alert.alert("Email enviado", "Verifique seu email para recuperar sua senha.", [
          { text: "Ok", onPress: () => { this.props.navigation.pop() } }
        ]);
      } catch (error) {
        if(error.code === 'auth/invalid-email'){
          alert('Insira um email válido.');
        }
        else if(error.code === 'auth/user-not-found'){
          Alert.alert("Usuário não encontrado", "Verifique o email digitado.", [
            { text: "Ok" }
          ]);        }
        else console.log(error.code)
      }
    }
    else alert('Insira um email válido')

    formikBag.setSubmitting(false);
  };

  renderForm = ({
    values,
    handleSubmit,
    setFieldValue,
    touched,
    errors,
    setFieldTouched,
    isValid,
    isSubmitting
  }) => (
      <View style={styles.container}>
        <Input
          containerStyle={styles.inputContainer}
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
          value={values.email}
          onChangeText={value => setFieldValue("email", value)}
          onBlur={() => setFieldTouched("email")}
          editable={!isSubmitting}
          errorMessage={touched.email && errors.email ? errors.email : undefined}
        />
        <Button
          title={"Reset password"}
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
          title={"Back to login"}
          containerStyle={styles.backToLoginButtonContainer}
          titleStyle={styles.backToLoginTitle}
          onPress={() => this.props.navigation.pop()}
        />
      </View>
    );

  render() {
    return (
      <Formik
        initialValues={{ email: "" }}
        onSubmit={(values, formikBag) =>
          this.handleSubmit(values, formikBag)
        }
        validationSchema={yupObject().shape({
          email: yupString()
            .email("Email inválido")
            .required("O email é obrigatório")
        })}

      >
        {(formikBag) => this.renderForm(formikBag)}
      </Formik>
    );
  }
}