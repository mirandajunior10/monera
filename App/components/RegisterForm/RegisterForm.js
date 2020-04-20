import styles from "./styles";
import { Formik} from "formik";
import React, { Component } from "react";
import Logo from "../../../assets/logo.png";
import { View } from "react-native";
import { Button, Input, Image, Text } from "react-native-elements";
import { object as yupObject, ref as yupRef, string as yupString } from "yup";


export default class RegisterForm extends Component {
  
  handleSubmit = (values, formikBag) => {
    formikBag.setSubmitting(true);
    if (values.email != values.password) {
      setTimeout(() => {
        formikBag.setSubmitting(false);
        this.props.navigation.navigate("HomeScreen");
      }, 3000);
    }
  };

  renderForm = (
    {
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
      <Image
          source={Logo}
          style={styles.logo}>
      </Image>

      <Text style={styles.textLogo}>Monera</Text>

      <Input
        containerStyle={ styles.inputContainer }
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        value={values.email}
        onChangeText={value => setFieldValue("email", value)}
        onBlur={() => setFieldTouched("email")}
        editable={!isSubmitting}
        errorMessage={touched.email && errors.email ? errors.email : undefined}
      />
      <Input
        containerStyle={ styles.inputContainer }
        placeholder="Password"
        secureTextEntry
        autoCapitalize="none"
        value={values.password}
        onChangeText={value => setFieldValue("password", value)}
        onBlur={() => setFieldTouched("password")}
        editable={!isSubmitting}
        errorMessage={touched.password && errors.password ? errors.password : undefined}
      />
      <Input
        containerStyle={ styles.inputContainer }
        placeholder="Confirm password"
        secureTextEntry
        autoCapitalize="none"
        value={values.confirmPassword}
        onChangeText={value => setFieldValue("confirmPassword", value)}
        onBlur={() => setFieldTouched("confirmPassword")}
        editable={!isSubmitting}
        errorMessage={
          touched.confirmPassword && errors.confirmPassword ? errors.confirmPassword : undefined
        }
      />
      <Button
        title={"Register"}
        containerStyle={styles.registerButtonContainer}
        buttonStyle={styles.registerButton}
        disabledStyle={styles.disabled}
        titleStyle={styles.registerButtonTitle}
        disabledTitleStyle={styles.registerButtonTitle}
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
        initialValues={{ email: "", password: "", confirmPassword: "" }}
        onSubmit={(values, formikBag) =>
          this.handleSubmit(values, formikBag)
        }
        validationSchema={yupObject().shape({
          email: yupString()
            .email("Email is invalid")
            .required("Email is required"),
          password: yupString()
            .min(8, "Minimum length is 8 characters")
            .required("Password is required"),
          confirmPassword: yupString()
            .oneOf([yupRef("password", undefined)], "Passwords do not match")
            .required("Password confirmation is required")
        })}
        
      >
        {(formikBag) =>  this.renderForm(formikBag)}
      </Formik>
    );
  }
}