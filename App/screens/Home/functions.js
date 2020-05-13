import { database } from '../../config/config';
import axios from 'axios';


export async function fetchUserData(user, context) {
    database.ref('users/' + user.uid).once("value").then(function(snapshot) {

        var portfolio = Object.entries(snapshot.val().stocks);
        portfolio.map((stock) => ({
            index: stock[0],
            item: stock[1]
        }));

        context.setState({
            userData: snapshot.val(),
            portfolio
        });

    }).catch(function(error) {
        console.log(error)

    });
}

export async function fecthStocks(context) {

    axios.get("https://finnhub.io/api/v1/stock/symbol?exchange=SA&token=bqhhk0vrh5rdcs9r1thg")
        .then(function(response) {
            context.setState({
                stocks: response.data,
            })
        })
        .catch(function(error) {
            console.log(error);
        });
}

export async function getStocks(context, query) {
    context.setState({selected: false})
    if (query === '') {
        context.setState({ stocksSuggestions: [] })
    } else {
        const regex = new RegExp(`${query.trim()}`, 'i');
        let stocks = context.state.stocks.filter(stock => stock.symbol.search(regex) >= 0);
        context.setState({ stocksSuggestions: stocks })
    }



}