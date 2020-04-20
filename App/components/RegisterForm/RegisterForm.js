import styles from "./styles";
import { Formik} from "formik";
import React, { Component } from "react";
import { View } from "react-native";
import { Button, Input } from "react-native-elements";
import { object as yupObject, ref as yupRef, string as yupString } from "yup";
import { auth } from '../../config/config';



export default class RegisterForm extends Component {

  
  handleSubmit = async (values, formikBag) => {
 
    var email = values.email;
    var password = values.password;

    if (email != '' && password != '' && email != password) {
      formikBag.setSubmitting(true);
      try {
          let snapshot = await auth.createUserWithEmailAndPassword(email, password);
          //this.createUserObject(snapshot.user, email);
          
          this.props.navigation.navigate("HomeScreen");
          formikBag.setSubmitting(false);

      } catch (error) {
          formikBag.setSubmitting(false);
          console.log(error);
          alert(error)
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
      <Input
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