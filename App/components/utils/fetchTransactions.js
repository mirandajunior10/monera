import snapshotToObject from "./snapShotToObject"
import { database, auth } from '../../config/config';
import sortDescending from "./sortDescending";

export async function fetchTransactions(context, snapshot, variant) {

  //Variante 1: fetchTransaction da tela de transações
  //Variante 2: fetchTransaction da tela home
  if (variant === 1) {
    context.setState({ refreshing: true })
    let snapshot = await database.ref('users/' + auth.currentUser.uid).once("value")
    handleSnapshot(context, snapshot)
    context.setState({ refreshing: false })
  }

}

export function handleSnapshot(context, snapshot) {

  //Eventualmente, essa função é chamada tantas vezes, que o contexto passado é nulo e a função retorna um erro, essa linha de código trata este erro
  //Não possui impacto no setState, pois a função já foi chamada algumas vezes antes do contexto ficar nulo
  if (context === null) return

  var transactions = snapshot.val().transactions
  let saldo = snapshot.val().saldo
  let saldoDisplay = '0.00'

  //Separa os itens em um array contendo o ID da transação e os dados da transação
  if (transactions) {

    transactions = snapshotToObject(snapshot.val().transactions)

    //Ordena por data em ordem decrescente
    transactions = sortDescending(transactions)

    //Soma o saldo total do usuário
    transactions.forEach((transacao) => {

      let valor = Number(transacao[1].valor)
      transacao[1].valorDisplay = valor.toFixed(2).replace('.', ',')


    })
    let valor = Number(saldo)

    saldoDisplay = valor.toFixed(2)

  }
  else {
    transactions = []
    saldoDisplay = Number(saldo).toFixed(2)
  }

  context.setState({
    transactions,
    saldo,
    saldoDisplay: saldoDisplay.replace('.', ',')
  });

}
/* 
export default async function fetchTransactions(context, snapshot, variant) {

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


} */