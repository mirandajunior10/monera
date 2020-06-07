import { database, auth } from '../../config/config';
import axios from 'axios';

export async function addTransaction(transaction, context) {
  var newTransactionKey = database.ref('users/' + auth.currentUser.uid + '/transactions').child('posts').push().key;

  var updates = {};
  let saldoAtual = Number(context.state.saldo);

  let valor = Number(transaction.valor)
  let saldoFinal = saldoAtual + valor;

  saldoFinal = saldoFinal.toFixed(2).replace(',', '.');

  updates['users/' + auth.currentUser.uid + '/transactions/' + newTransactionKey] = transaction;
  updates['users/' + auth.currentUser.uid + '/saldo'] = saldoFinal;
  await database.ref().update(updates)
}

export async function fetchPortfolio(context) {

  let snapshot = await database.ref('users/' + auth.currentUser.uid + '/stocks').once("value")
  handleSnapshot(context, snapshot)

}

export function handleSnapshot(context, snapshot) {


  //Eventualmente, essa função é chamada tantas vezes, que o contexto passado é nulo e a função retorna um erro, essa linha de código trata este erro
  //Não possui impacto no setState, pois a função já foi chamada algumas vezes antes do contexto ficar nulo
  if (context === null) return
  var portfolio = Object.entries(snapshot.val());
  portfolio.map((stock) => ({
    index: stock[0],
    item: stock[1]
  }));

  let saldoDisplay = Number(context.state.saldo).toFixed(2).replace('.', ',')

  context.setState({
    portfolio,
    saldoDisplay
  });

}

//id diz respeito ao tipo de operação, 1 é receita, 2 é despesa
export async function handleAddTransaction(context, id) {
  //Converte as string de valor para inteiro/float pra facilidar o tratamento de dados
  let valorNumber = context.state.valor.replace(',', '.')
  valorNumber = Number(valorNumber);
  valorNumber = valorNumber.toFixed(2)

  if (id === 1) {
    let item = {
      descricao: context.state.descricao,
      valor: valorNumber,
      data: context.state.data,
      tipo: 'Receita'
    };
    await addTransaction(item, context);

  } else {
    let item = {
      descricao: context.state.descricao,
      valor: '-' + valorNumber,
      data: context.state.data,
      tipo: 'Despesa'
    };
    await addTransaction(item, context);

  }
  handleCancel(context)
}

export function handleCancel(context) {
  context.setState({
    dialogReceitaVisible: false,
    dialogDespesaVisible: false,
    valor: '',
    descricao: '',
    data: '',
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
    case 'bt_nova_acao':
      context.setState({ modalVisible: true })
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

export async function updateTransactions(context) {
  context.setState({ refreshing: true })
  await fetchTransactions(context);
  context.setState({ refreshing: false })
}

export async function deleteTransaction(transaction, context) {
  var updates = {};

  let saldoAtual = Number(context.state.saldo);
  let valor = Number(transaction[1].valor)
  let saldoFinal = saldoAtual - valor;

  saldoFinal = saldoFinal.toFixed(2).replace(',', '.');

  updates['users/' + auth.currentUser.uid + '/transactions/' + transaction[0]] = null;
  updates['users/' + auth.currentUser.uid + '/saldo'] = saldoFinal;
  database.ref().update(updates).then(async function (snapshot) {
    await fetchTransactions(context);
  }).catch(function (error) {
    console.log(error);
  })

}

export async function fecthStocks(context) {

  axios.get("https://finnhub.io/api/v1/stock/symbol?exchange=SA&token=bqhhk0vrh5rdcs9r1thg")
    .then(function (response) {
      context.setState({
        stocks: response.data,
      })
    })
    .catch(function (error) {
      console.log(error);
    });
}


export async function getStocks(context, query) {
  context.setState({ selected: false })
  if (query === '') {
    context.setState({ stocksSuggestions: [] })
  } else {
    const regex = new RegExp(`${query.trim()}`, 'i');
    let stocks = context.state.stocks.filter(stock => stock.symbol.search(regex) >= 0);
    context.setState({ stocksSuggestions: stocks })
  }
}

