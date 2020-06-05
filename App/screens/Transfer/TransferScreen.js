import React, { Component } from "react";
import styles from './styles';
import { View, Text, TextInput, Keyboard } from "react-native";
import { Button, Input } from "react-native-elements";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Icon from 'react-native-vector-icons/Ionicons';
import { TextInputMask } from "react-native-masked-text";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { handleAddTransaction } from './functions';
import { Formik } from "formik";
import { object as yupObject, string as yupString } from "yup";

class TransferScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      banco: '',
      agencia: '',
      conta: '',
      nome: '',
      cpf: '',
      valor: '',
      data: ''
    }
  }
  handleSubmit = async (values, formikBag) => {

    await formikBag.setSubmitting(true);
    handleAddTransaction(this, values)
    formikBag.setSubmitting(false);

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
      <KeyboardAwareScrollView>
        <View style={styles.container}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.header}>
              <Icon name="md-menu" style={styles.menu} onPress={() => this.props.navigation.toggleDrawer()} />
              <View style={styles.titleHeader}>
                <Text style={styles.title}>Transferência</Text>
              </View>
              <Icon name="md-qr-scanner" style={styles.qrcode}></Icon>
            </View>
            <View style={styles.content}>
              <View style={styles.textInputContainer}>
                <Text style={styles.inputTitle}>Valor:</Text>
                <Input
                  keyboardType='number-pad'
                  value={values.valor}
                  onBlur={() => setFieldTouched("valor")}
                  editable={!isSubmitting}
                  errorMessage={touched.valor && errors.valor ? errors.valor : undefined}
                  onChangeText={(text) => setFieldValue("valor", text)}
                  style={styles.inputText} />
              </View>
              <View style={styles.textInputContainer}>
                <Text style={styles.inputTitle}>Banco:</Text>
                <Input
                  autoCapitalize="words"
                  value={values.banco}
                  onBlur={() => setFieldTouched("banco")}
                  editable={!isSubmitting}
                  errorMessage={touched.banco && errors.banco ? errors.banco : undefined}
                  onChangeText={(text) => setFieldValue("banco", text)}
                  style={styles.inputText} />
              </View>
              <View style={styles.textInputContainer}>
                <Text style={styles.inputTitle}>Agência:</Text>
                <Input
                  keyboardType='number-pad'
                  value={values.agencia}
                  onBlur={() => setFieldTouched("agencia")}
                  editable={!isSubmitting}
                  errorMessage={touched.agencia && errors.agencia ? errors.agencia : undefined}
                  onChangeText={(text) => setFieldValue("agencia", text)}
                  style={styles.inputText} />
              </View>
              <View style={styles.textInputContainer}>
                <Text style={styles.inputTitle}>Conta:</Text>
                <Input
                  keyboardType='number-pad'
                  value={values.conta}
                  onBlur={() => setFieldTouched("conta")}
                  editable={!isSubmitting}
                  errorMessage={touched.conta && errors.conta ? errors.conta : undefined}
                  onChangeText={(text) => setFieldValue("conta", text)}
                  style={styles.inputText} />
              </View>
              <View style={styles.textInputContainer}>
                <Text style={styles.inputTitle}>Nome:</Text>
                <Input
                  autoCapitalize="words"
                  value={values.nome}
                  onBlur={() => setFieldTouched("nome")}
                  editable={!isSubmitting}
                  errorMessage={touched.nome && errors.nome ? errors.nome : undefined}
                  onChangeText={(text) => setFieldValue("nome", text)}
                  style={styles.inputText} />
              </View>
              <View style={styles.textInputContainer}>
                <Text style={styles.inputTitle}>CPF:</Text>

                <Input
                  keyboardType={"number-pad"}
                  value={values.cpf}
                  onBlur={() => setFieldTouched("nome")}
                  editable={!isSubmitting}
                  errorMessage={touched.cpf && errors.cpf ? errors.cpf : undefined}
                  onChangeText={(text) => setFieldValue("cpf", text)}
                  style={styles.inputText} />

                {/*     <TextInputMask
                  type={'cpf'}
                  style={styles.inputText}
                  value={values.cpf}
                  onBlur={() => setFieldTouched("cpf")}
                  editable={!isSubmitting}
                  errorMessage={touched.cpf && errors.cpf ? errors.cpf : undefined}
                  onChangeText={text => {
                    setFieldValue("cpf", text)
                  }}
                  ref={(ref) => this.cpfField = ref}
                /> */}
              </View>

              <Button
                title={"Transferir"}
                containerStyle={styles.transferButtonContainer}
                buttonStyle={styles.button}
                disabledStyle={styles.disabled}
                titleStyle={styles.transferButtonTitle}
                disabledTitleStyle={styles.transferButtonTitle}
                onPress={handleSubmit}
                disabled={!isValid || isSubmitting}
                loading={isSubmitting}
                loadingProps={{ size: "large", color: "white" }}
              />
            </View>
          </TouchableWithoutFeedback>
        </View>
      </KeyboardAwareScrollView>

    );
  render() {
    return (
      <Formik
        initialValues={{ valor: "", banco: "", agencia: "", conta: "", nome: "", cpf: "" }}
        onSubmit={(values, formikBag) =>
          this.handleSubmit(values, formikBag)
        }
        validationSchema={yupObject().shape({
          valor: yupString()
            .required("O valor é obrigatório"),
          banco: yupString()
            .required("O banco é obrigatória"),
          agencia: yupString()
            .required("A agencia é obrigatório"),
          conta: yupString()
            .required("A conta é obrigatório"),
          nome: yupString()
            .required("O nome é obrigatório"),
          cpf: yupString()
            .required("O CPF é obrigatório"),
        })}
      >
        {(formikBag) => this.renderForm(formikBag)}
      </Formik>
    );
  }

}



export default TransferScreen;
