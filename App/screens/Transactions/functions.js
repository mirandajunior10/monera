import { database } from '../../config/config';

export async function fetchTransactions(user, context) {
    database.ref('users/' + user.uid + '/transactions').once("value").then(function(snapshot) {

        console.log(snapshot.val())
        // var portfolio = Object.entries(snapshot.val().stocks);
        // portfolio.map((stock) => ({
        //     index: stock[0],
        //     item: stock[1]
        // }));

        // context.setState({
        //     userData: snapshot.val(),
        //     portfolio
        // });

    }).catch(function(error) {
        console.log(error)

    });
}
