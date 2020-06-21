import { auth, database } from '../../config/config';

export default async function addTransaction(transaction, context) {
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