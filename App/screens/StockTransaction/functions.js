import React from 'react'
import { Alert } from 'react-native'
import { database, auth } from '../../config/config';

export function validateInput(context) {

  if (context.state.data.length <= 0) {
    alert("Selecione uma data para a ordem")
    handleCancel(context)
    return false
  }
  let valor = Number(context.state.valor);
  if (valor <= 0) {
    alert("O valor da ordem deve ser maior do que zero")
    handleCancel(context)
    return false

  }
  if (!Number.isInteger(context.state.quantidade) && context.state.quantidade <= 0) {
    alert("A quantidade deve ser um inteiro e maior do que zero")
    handleCancel(context)
    return false

  }
  return true
}


export async function fetchTransactions(context) {
  context.setState({ refreshing: true })
  let snapshot = await database.ref('users/' + auth.currentUser.uid + '/stocks/' + context.state.ticker + '/transactions').once("value")
  handleTransactions(context, snapshot.val())
  context.setState({ refreshing: false })

}

export function handleTransactions(context, transactions) {


  let saldoDisplay = '0.00'
  transactions = Object.entries(transactions);
  transactions.map((stock) => ({
    index: stock[0],
    item: stock[1]
  }));

  transactions = transactions.filter(function (transaction) {
    return transaction[1] != null;
  });



  //Ordena por data em ordem decrescente
  transactions.sort((a, b) => {
    let dateA = stringToDate(a[1].data, 'dd/MM/yyyy', '/')
    let dateB = stringToDate(b[1].data, 'dd/MM/yyyy', '/')

    return dateB - dateA;
  })
  let valorTotal = 0
  let quantidadeTotal = 0
  transactions.forEach((transacao) => {
    let valor = Number(transacao[1].valor * transacao[1].quantidade)
    valorTotal += valor
    transacao[1].valorDisplay = valor.toFixed(2).replace('.', ',')
    quantidadeTotal += Number(transacao[1].quantidade)


  })
  saldoDisplay = valorTotal.toFixed(2).replace('.', ',')
  context.setState({ transactions, saldoDisplay, quantidadeTotal })

}

//id diz respeito ao tipo de operação, 1 é compra, 2 é venda
export async function handleAddTransaction(context, id) {

  //Converte as string de valor para inteiro/float pra facilidar o tratamento de dados
  let valorNumber = context.state.valor.replace(',', '.')
  valorNumber = Number(valorNumber);
  valorNumber = valorNumber.toFixed(2)

  if (id === 1) {
    let item = {
      descricao: "Compra de " + context.state.ticker,
      quantidade: context.state.quantidade,
      valor: valorNumber,
      data: context.state.data,
      tipo: 'Compra'
    };
    await addTransaction(item, context);

  } else {
    item = {
      descricao: "Venda de " + context.state.ticker,
      quantidade: context.state.quantidade,
      valor: valorNumber,
      data: context.state.data,
      tipo: 'Venda'
    };
    await addTransaction(item, context);

  }
  handleCancel(context)
}

export async function addTransaction(order, context) {

  let snapshot = await database.ref('users/' + auth.currentUser.uid + '/stocks/' + context.state.ticker).once("value");
  let updates = {};
  let stock = {}
  let newTransactionKey = database.ref('users/' + auth.currentUser.uid + '/stocks/' + context.state.ticker + '/transactions').child('posts').push().key;

  stock = snapshot.val()
  stock.quantidade = (Number(stock.quantidade) + Number(order.quantidade))
  let valorTotal = 0
  let quantidadeTotal = 0
  let transactions = Object.entries(stock.transactions);

  transactions.map((stock) => ({
    index: stock[0],
    item: stock[1]
  }));

  transactions.forEach((order) => {
    valorTotal += Number(order[1].valor * order[1].quantidade)
    quantidadeTotal += Number(order[1].quantidade)
  })

  stock.PM = (valorTotal + (Number(order.valor) * order.quantidade)) / (quantidadeTotal + Number(order.quantidade));
  stock.PM = Number(stock.PM).toFixed(2)
  stock.transactions[newTransactionKey] = order
  updates['users/' + auth.currentUser.uid + '/stocks/' + context.state.ticker] = stock;
  handleCancel(context)
  await database.ref().update(updates)
  snapshot = await database.ref('users/' + auth.currentUser.uid + '/stocks/' + context.state.ticker + '/transactions').once("value");
  handleTransactions(context, snapshot.val())

}


export function handleCancel(context) {
  context.setState({
    modalVisible: false,
    valor: '',
    descricao: '',
    data: '',
    quantidade: ''
  });
};

export function handleDate(context, event, date) {
  context.setState({ show: false })
  if (date === undefined) {
    context.setState({ data: '' })
  }
  else {

    var data = date.getDate();
    var month = date.getMonth();
    var year = date.getFullYear();

    //O mês começa em 0 e termina em 11, por isso a adição
    var dateString = data + "/" + (month + 1) + "/" + year;
    context.setState({ data: dateString })
  }

};

export function handleAction(context, name) {
  switch (name) {
    case 'add_compra':
      context.setState({ modalVisible: true });
      break;
    default:
      break;
  }
}

function stringToDate(_date, _format, _delimiter) {
  var formatLowerCase = _format.toLowerCase();
  var formatItems = formatLowerCase.split(_delimiter);
  var dateItems = _date.split(_delimiter);
  var monthIndex = formatItems.indexOf("mm");
  var dayIndex = formatItems.indexOf("dd");
  var yearIndex = formatItems.indexOf("yyyy");
  var month = parseInt(dateItems[monthIndex]);
  month -= 1;
  var formatedDate = new Date(dateItems[yearIndex], month, dateItems[dayIndex]);
  return formatedDate;
}

export async function deleteTransaction(transaction, context) {

  if (context.state.transactions.length === 1) {
    await database.ref('users/' + auth.currentUser.uid + '/stocks/' + context.state.ticker).remove()
    context.props.navigation.pop()
  }
  else {
    var updates = {};


    let snapshot = await (await database.ref('users/' + auth.currentUser.uid + '/stocks/' + context.state.ticker).once("value")).val()
    console.log(snapshot.transactions)

    let posicaoTotal = Number(context.state.saldoDisplay.replace(',', '.'))
    let quantidadeTotal = context.state.quantidadeTotal
    quantidadeTotal -= transaction[1].quantidade
    posicaoTotal -= Number(transaction[1].valorDisplay.replace(',', '.'))

    let PM = Number(posicaoTotal / quantidadeTotal).toFixed(2)

    snapshot.PM = PM
    snapshot.quantidade = quantidadeTotal
    snapshot.transactions[transaction[0]] = null

   // handleTransactions(context, snapshot.transactions)



    updates[['users/' + auth.currentUser.uid + '/stocks/' + context.state.ticker]] = snapshot;
    await database.ref().update(updates)

    fetchTransactions(context)
  }

}


export async function confirmDelete(item, context) {

  console.log(item)
  Alert.alert(
    'Exclusão',
    'Tem certeza que deseja excluir a ' + item[1].descricao + '?',
    [
      { text: 'Sim', onPress: () => { deleteTransaction(item, context) }, style: 'cancel' },
      { text: 'Não', onPress: () => { }, style: 'cancel' },
    ],
    { cancelable: true }
  );

}
