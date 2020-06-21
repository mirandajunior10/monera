
export default async function fetchTransactions(context, snapshot) {

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