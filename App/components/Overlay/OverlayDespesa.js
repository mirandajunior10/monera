import React, { useEffect } from 'react';
import { Text, View, TextInput } from 'react-native';
import { Button } from "react-native-elements";
import Overlay from 'react-native-modal-overlay';
import DateTimePicker from '@react-native-community/datetimepicker';
import handleCancel from '../utils/handleCancel'
import handleAddTransaction from '../utils/handleAddTransaction'
import handleDate from '../utils/handleDate'


export default function OverlayReceita(props) {

  const {
    context,
    styles,

  } = props;


  return (
    <Overlay
      visible={context.state.despesaOverlay}
      closeOnTouchOutside
      onClose={() => handleCancel(context)}
      animationType="zoomIn"
      containerStyle={styles.overlayContainer}
      //childrenWrapperStyle={styles.overlayWrapper}
      animationDuration={200}>

      <Text style={[styles.titleOverlay, styles.saldoNegativo]}>Inserir Despesa</Text>

      <Text style={styles.inputTitle}>Descrição:</Text>
      <TextInput
        placeholder="Digite a descrição"
        value={context.state.descricao}
        onChange={({ nativeEvent }) => context.setState({ descricao: nativeEvent.text })}
        autoFocus={true}
        style={styles.inputText} />

      <Text style={styles.inputTitle}>Valor:</Text>
      <TextInput
        placeholder="Digite o valor"
        value={context.state.valor}
        onChange={({ nativeEvent }) => context.setState({ valor: nativeEvent.text })}
        keyboardType="number-pad"
        style={styles.inputText} />

      <Text style={styles.inputTitle}>Data:</Text>
      <TextInput
        placeholder="Selecione a data "
        style={styles.inputText}
        value={context.state.data}
        onFocus={() => context.setState({ show: true })}
      />
      {
        context.state.show &&
        <DateTimePicker
          onChange={(event, date) => { handleDate(context, event, date) }}
          maximumDate={new Date()}
          value={new Date()}
          textColor="red"
        />
      }
      <View style={styles.buttonContainer}>
        <Button
          title={"Cancelar"}
          buttonStyle={styles.overlayButton}
          titleStyle={[styles.buttonTitle, styles.saldoNegativo]}
          disabledTitleStyle={styles.buttonTitle}
          onPress={() => { handleCancel(context) }}
        />
        <Button
          title={"Inserir"}
          buttonStyle={styles.overlayButton}
          titleStyle={[styles.buttonTitle, styles.saldoNegativo]}
          disabledTitleStyle={[styles.buttonTitle, styles.saldoNegativo]}
          onPress={() => { handleAddTransaction(context, 2) }}
        />
      </View>
    </Overlay>
  )

}