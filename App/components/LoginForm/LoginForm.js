import styles from "./styles";
import React, { Component } from "react";
import { View } from "react-native";
import { Button, Input } from "react-native-elements";
import { Formik } from "formik";
import { object as yupObject, string as yupString } from "yup";


class LoginForm extends Component {

    handleSubmit = (values, formikBag) => {
        formikBag.setSubmitting(true);
        // Here you would usually make a call to your API for a login.
        setTimeout(() => {
          formikBag.setSubmitting(false);
          this.props.navigation.navigate("HomeScreen");
        }, 3000);
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

      <Input
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
        type="clear"
        title="Forgot Password?"
        containerStyle={styles.forgottenPasswordButtonContainer}
        titleStyle={styles.forgottenPasswordTitle}
        onPress={() => this.props.navigation.navigate("PasswordResetScreen")}
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