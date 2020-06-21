import React, { useEffect } from 'react';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import { Button } from "react-native-elements";
import Overlay from 'react-native-modal-overlay';
import DateTimePicker from '@react-native-community/datetimepicker';
import Autocomplete from 'react-native-autocomplete-input';
import handleCancel from '../utils/handleCancel'
import handleAddTransaction from '../utils/handleAddTransaction'
import handleDate from '../utils/handleDate'




export default function OverlayReceita(props) {

  const {
    context,
    styles,
    getStocks
  } = props;

  return (
    <Overlay
      visible={context.state.modalVisible}
      closeOnTouchOutside
      onClose={() => handleCancel(context)}
      animationType="zoomIn"
      containerStyle={styles.overlayContainer}
      // childrenWrapperStyle={[styles.overlayWrapper, styles.overlayWrapperAcao]}
      animationDuration={200}>

      <Text style={styles.titleOverlay}>Inserir ação</Text>
      <View style={styles.autoCompleteView}>
        <Text style={[styles.inputTitle, styles.inputTitle2]}>Código da ação</Text>
        <Autocomplete
          inputContainerStyle={styles.inputContainer}
          listContainerStyle={styles.autocompleteList}
          listStyle={styles.listAutocompleteStyle}
          autoCapitalize="none"
          hideResults={context.state.selected}
          keyExtractor={(item, index) => index.toString()}
          autoCorrect={false}
          data={context.state.stocksSuggestions}
          defaultValue={context.state.selectedStock}
          onChangeText={text => { getStocks(context, text); context.setState({ selected: false }) }}
          placeholder="Código da ação"
          renderItem={({ item }) => (

            //you can change the view you want to show in suggestion from here
            <TouchableOpacity onPress={() => context.setState({ stockData: item, selectedStock: item.symbol.split('.')[0], selected: true })}>
              <Text style={styles.itemText}>
                {item.symbol.split('.')[0]}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>
      <View style={styles.formContainer}>
        <Text style={[styles.inputTitle, styles.inputTitle2]}>Quantidade</Text>
        <TextInput
          placeholder="Digite a quantidade"
          keyboardType={"number-pad"}
          value={context.state.quantidade}
          onChangeText={(text) => context.setState({ quantidade: text })}
          style={styles.inputText} />

        <Text style={[styles.inputTitle, styles.inputTitle2]}>Valor</Text>
        <TextInput
          placeholder="Digite o valor da ação"
          keyboardType={"number-pad"}
          value={context.state.valor}
          onChangeText={(text) => context.setState({ valor: text })}
          style={styles.inputText} />

        <Text style={[styles.inputTitle, styles.inputTitle2]}>Data</Text>
        <TextInput
          placeholder="Selecione a data "
          autoCapitalize="words"
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
      </View>
      <View style={[styles.buttonContainer, styles.buttonContainer2]}>
        <Button
          title={"Cancelar"}
          buttonStyle={styles.overlayButton}
          titleStyle={[styles.buttonTitle, styles.buttonTitle2]}
          disabledTitleStyle={styles.buttonTitle}
          onPress={() => { handleCancel(context) }}
        />
        <Button
          title={"Inserir"}
          buttonStyle={styles.overlayButton}
          titleStyle={[styles.buttonTitle, styles.buttonTitle2]}
          disabledTitleStyle={styles.buttonTitle}
          onPress={() => { handleAddTransaction(context, 3) }}
        />
      </View>

    </Overlay>
  )

}