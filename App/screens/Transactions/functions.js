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
  await database.ref().update(updates)
}

export async function fetchTransactions(context) {
  context.setState({ refreshing: true })
  let snapshot = await database.ref('users/' + auth.currentUser.uid).once("value")
  handleSnapshot(context, snapshot)
  context.setState({ refreshing: false })

}

export function handleSnapshot(context, snapshot) {


  //Eventualmente, essa função é chamada tantas vezes, que o contexto passado é nulo e a função retorna um erro, essa linha de código trata este erro
  //Não possui impacto no setState, pois a função já foi chamada algumas vezes antes do contexto ficar nulo
  if(context === null) return
  
  var transactions = []
  let saldo = snapshot.val().saldo
  let saldoDisplay = '0'


  //Separa os itens em um array contendo o ID da transação e os dados da transação
   if (snapshot.val().transactions) {

    transactions = Object.entries(snapshot.val().transactions);
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
  else {
    saldoDisplay = Number(saldo).toFixed(2).replace('.', ',')
  } 

  

   context.setState({
    transactions,
    saldo,
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

/* export function handleCancel(context) {
  context.setState({
    dialogReceitaVisible: false,
    dialogDespesaVisible: false,
    valor: '',
    descricao: '',
    data: '',
  });
}; */

export function handleCancel(context) {
  context.setState({
    receitaOverlay: false,
    despesaOverlay: false,
    selected: false,
    descricao: '',
    valor: '',
    data: '',
    stocksSuggestions: []
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
      context.setState({ receitaOverlay: true })
      // context.setState({ dialogReceitaVisible: true });
      break;
    case 'add_despesa':
      context.setState({ despesaOverlay: true })
     /*  context.setState({ dialogDespesaVisible: true }); */
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