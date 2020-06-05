import { database, auth } from '../../config/config';

export async function addTransaction(transaction, context) {
  var newTransactionKey = database.ref('users/' + auth.currentUser.uid + '/transactions').child('posts').push().key;

  var updates = {};
  let saldoAtual = Number(context.state.saldo);
  
  let valor = Number(transaction.valor)
  let saldoFinal = saldoAtual + valor;

  saldoFinal = saldoFinal.toFixed(2).replace(',', '.');

  updates['users/' + auth.currentUser.uid + '/transactions/' + newTransactionKey] = transaction;
  updates['users/' + auth.currentUser.uid + '/saldo'] = saldoFinal;
  database.ref().update(updates).then(async function (snapshot) {
    await fetchTransactions(auth.currentUser, context);
  }).catch(function (error) {
    console.log(error);
  })
}

export async function fetchTransactions(user, context) {

  database.ref('users/' + user.uid).once("value").then(function (snapshot) {
    let data = snapshot.val();
    var transactions = []
    let saldo = data.saldo
    let saldoDisplay = '0'


    //Separa os itens em um array contendo o ID da transação e os dados da transação
    if (snapshot.val().transactions) {
      transactions = Object.entries(data.transactions);
      transactions.map((stock) => ({
        index: stock[0],
        item: stock[1]
      }));

      //Ordena por data em ordem decrescente
      transactions.sort((a, b) => {
        let dateA = stringToDate(a[1].data, 'dd/MM/yyyy', '/')
        let dateB = stringToDate(b[1].data, 'dd/MM/yyyy', '/')

        return dateB - dateA;
      })

      //Soma o saldo total do usuário
      transactions.forEach((transacao) => {

        let valor = Number(transacao[1].valor)
        transacao[1].valorDisplay = valor.toFixed(2).replace('.', ',')


      })
      let valor = Number(saldo)

      saldoDisplay = valor.toFixed(2).replace('.', ',')

    }

    context.setState({
      transactions,
      saldo,
      saldoDisplay
    });


  }).catch(function (error) {
    console.log(error)

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
    case 'add_receita':
      context.setState({ dialogReceitaVisible: true });
      break;
    case 'add_despesa':
      context.setState({ dialogDespesaVisible: true });
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
  await fetchTransactions(auth.currentUser, context);
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
    await fetchTransactions(auth.currentUser, context);
  }).catch(function (error) {
    console.log(error);
  })

}