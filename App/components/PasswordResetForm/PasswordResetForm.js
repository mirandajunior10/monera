import styles from "./styles";
import { Formik } from "formik";
import React, { Component } from "react";
import { Alert, View } from "react-native";
import { Button, Input } from "react-native-elements";
import { object as yupObject, string as yupString } from "yup";

export default class PasswordResetForm extends Component{
  
  handleSubmit = (values, formikBag) => {
    formikBag.setSubmitting(true);
    // Here you would usually make a call to your API for a login.
    setTimeout(() => {
      formikBag.setSubmitting(false);
      Alert.alert("Email sent", "Check your email to reset your password.", [
        { text: "Ok", onPress: () => {this.props.navigation.pop()} }
      ]);
    }, 3000);
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
            .email("Email is invalid")
            .required("Email is required")
        })}
        
      >
        {(formikBag) => this.renderForm(formikBag)}
        </Formik>
    );
  }
}