import { database, auth } from '../../config/config';
import axios from 'axios';


export async function fetchUserData(context) {
    if(auth.currentUser === null) return
    database.ref('users/' + auth.currentUser.uid).once("value").then(function (snapshot) {

        var portfolio = Object.entries(snapshot.val().stocks);
        portfolio.map((stock) => ({
            index: stock[0],
            item: stock[1]
        }));

        context.setState({
            userData: snapshot.val(),
            portfolio
        });

    }).catch(function (error) {
        console.log(error)

    });
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

export function handleCancel(context) {
    context.setState({
      dialogVisible: false,
    });
  };

export async function fetchTransactions(context, snapshot) {
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
        transactions.map((stock) => ({
            index: stock[0],
            item: stock[1]
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