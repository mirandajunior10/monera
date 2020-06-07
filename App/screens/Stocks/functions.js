import { database, auth } from '../../config/config';
import axios from 'axios';

export async function addStock(order, context) {

  let snapshot = await database.ref('users/' + auth.currentUser.uid + '/stocks/' + context.state.selectedStock).once("value");
  let updates = {};
  let stock = {}
  let newTransactionKey = database.ref('users/' + auth.currentUser.uid + '/stocks/' + context.state.selectedStock + '/transactions').child('posts').push().key;

  if (snapshot.val() !== null) {

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
    
    stock.PM = (valorTotal + (Number(order.valor) * order.quantidade)) /(quantidadeTotal + Number(order.quantidade));

    stock.transactions[newTransactionKey] = order
    updates['users/' + auth.currentUser.uid + '/stocks/' + context.state.selectedStock] = stock;

  }
  
  else {
    let nomeEmpresa = context.state.stockData.description.replace('Preference Shares', '')
    let transactions = {}
    transactions[newTransactionKey] = order
    stock = {
      empresa: nomeEmpresa,
      quantidade: Number(order.quantidade),
      PM: order.valor,
      transactions
    }

    updates = {};
    updates['users/' + auth.currentUser.uid + '/stocks/' + context.state.selectedStock] = stock;
  }
  await database.ref().update(updates)

}

export async function fetchPortfolio(context) {

  let snapshot = await database.ref('users/' + auth.currentUser.uid + '/stocks').once("value")
  handleSnapshot(context, snapshot)

}

export function handleSnapshot(context, snapshot) {

  let portfolio = []
  let saldoDisplay = '0.00'
  //Eventualmente, essa função é chamada tantas vezes, que o contexto passado é nulo e a função retorna um erro, essa linha de código trata este erro
  //Não possui impacto no setState, pois a função já foi chamada algumas vezes antes do contexto ficar nulo
  if (context === null) return
  if (snapshot.val()) {

    
    portfolio = Object.entries(snapshot.val());
    portfolio.map((stock) => ({
      index: stock[0],
      item: stock[1]
    }));
    portfolio.forEach((stock) => {

      let PM = Number(stock[1].PM);
      stock[1].PMDisplay = PM.toFixed(2).replace('.', ',')
    })
    saldoDisplay = Number(context.state.saldo).toFixed(2).replace('.', ',')
  }
  context.setState({
    portfolio,
    saldoDisplay
  });

}
export function validateInput(context) {

  if (context.state.data.length <= 0) {
    alert("Selecione uma data para a ordem")
    handleCancel(context)
    return false
  }
  if (context.state.selected === false) {
    alert("Selecione uma ação")
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

//id diz respeito ao tipo de operação, 1 é receita, 2 é despesa
export async function handleAddTransaction(context, id) {

  //Converte as string de valor para inteiro/float pra facilidar o tratamento de dados
  let valorNumber = context.state.valor.replace(',', '.')
  valorNumber = Number(valorNumber);
  valorNumber = valorNumber.toFixed(2)

  if (id === 1) {
    let item = {
      descricao: "Compra de " + context.state.selectedStock,
      quantidade: context.state.quantidade,
      valor: valorNumber,
      data: context.state.data,
      tipo: 'Compra'
    };
    await addStock(item, context);

  } else {
    item = {
      descricao: "Venda de " + context.state.selectedStock,
      quantidade: context.state.quantidade,
      valor: valorNumber,
      data: context.state.data,
      tipo: 'Venda'
    };
    await addStock(item, context);

  }
  handleCancel(context)
}

export function handleCancel(context) {
  context.setState({
    selectedStock: '',
    quantidade: '',
    valor: '',
    data: ''
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
  } else if (query.length > 2) {
    const regex = new RegExp(`${query.trim()}`, 'i');
    let stocks = context.state.stocks.filter(stock => stock.symbol.search(regex) >= 0);
    context.setState({ stocksSuggestions: stocks })
  }
}

