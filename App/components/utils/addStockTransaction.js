import { database, auth } from '../../config/config';

export default async function addStockTransaction(order, context) {

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

    stock.PM = (valorTotal + (Number(order.valor) * order.quantidade)) / (quantidadeTotal + Number(order.quantidade));
    stock.PM = Number(stock.PM).toFixed(2)
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