import axios from 'axios';
import handleCancel from '../../components/utils/handleCancel'

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

export async function fetchTransactions(context, snapshot) {

  if (context === null) return

  var transactions = []
  let receitas = 0
  let despesas = 0
  let saldo = 0
  let saldoDisplay = '0'
  let receitaDisplay = '0'
  let despesaDisplay = '0'

  //Separa os itens em um array contendo o ID da transação e os dados da transação
  if (snapshot.val()) {
    transactions = Object.entries(snapshot.val());
    transactions.map((transaction) => ({
      index: transaction[0],
      item: transaction[1]
    }));

    //Soma o saldo total do usuário
    transactions.forEach((transacao) => {

      let valor = Number(transacao[1].valor)
      if (valor >= 0) {
        receitas += valor
      }
      else {
        despesas += valor

      }

    })

    saldo = receitas + despesas
    receitaDisplay = receitas.toFixed(2).replace('.', ',')
    despesaDisplay = despesas.toFixed(2).replace('.', ',')
    saldoDisplay = saldo.toFixed(2).replace('.', ',')

  }
  else {
    saldoDisplay = Number(saldo).toFixed(2).replace('.', ',')
    receitaDisplay = receitas.toFixed(2).replace('.', ',')
    despesaDisplay = despesas.toFixed(2).replace('.', ',')

  }
  context.setState({
    saldo,
    saldoDisplay,
    receitaDisplay,
    despesaDisplay

  });


}

export function handleStocks(context, snapshot) {

  var portfolio = []
  let portfolioMenor = []
  let investimentoTotal = 0
  let investimentoTotalDisplay = '0.00'
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
      let PM = Number(stock[1].PM)
      stock[1].PMDisplay = PM
      investimentoTotal += countTotal(stock[1].transactions)
    })

    investimentoTotalDisplay = investimentoTotal.toFixed(2)
    if (portfolio.length > 0) portfolioMenor = portfolio.splice(0, 4);


  }

  context.setState({
    portfolio: portfolioMenor,
    investimentoTotalDisplay: investimentoTotalDisplay.replace('.', ',')
  });

}

function countTotal(transactions) {
  let total = 0;
  let transactionsArray = []
  transactionsArray = Object.entries(transactions);
  transactionsArray.map((stock) => ({
    index: stock[0],
    item: stock[1]
  }));

  transactionsArray.forEach((stock) => {
    total += Number(stock[1].quantidade * Number(stock[1].valor));

  })

  return total;
}

export function handleAction(context, name) {
  switch (name) {
    case 'add_receita':
      context.setState({ receitaOverlay: true })
      // context.setState({ dialogReceitaVisible: true });
      break;
    case 'add_despesa':
      context.setState({ despesaOverlay: true })
      /*  context.setState({ dialogDespesaVisible: true }); */
      break;
    case 'bt_nova_acao':
      context.setState({ modalVisible: true })
      break;
    default:
      break;
  }
}