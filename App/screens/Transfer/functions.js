import { database, auth } from '../../config/config';

export async function addTransaction(transaction, context) {
    var newTransactionKey = database.ref('users/' + auth.currentUser.uid + '/transactions').child('posts').push().key;

    var updates = {};
    let saldoAtual = await (await database.ref('users/' + auth.currentUser.uid + '/saldo').once("value")).val()
    saldoAtual = Number(saldoAtual)

    let valor = Number(transaction.valor)
    let saldoFinal = saldoAtual + valor;
    saldoFinal = saldoFinal.toFixed(2).replace(',', '.');

    context.setState({
        saldoDisplay: String(saldoFinal).replace('.', ','),
        saldo: saldoFinal
    })

    updates['users/' + auth.currentUser.uid + '/transactions/' + newTransactionKey] = transaction;
    updates['users/' + auth.currentUser.uid + '/saldo'] = saldoFinal;
    let snapshot = await database.ref().update(updates)
    alert('Transferência realizada')
}


//id diz respeito ao tipo de operação, 1 é receita, 2 é despesa
export async function handleAddTransaction(context, values) {
    let dateString = handleDate()
    let valorNumber = values.valor.replace(',', '.')
    valorNumber = Number(valorNumber);
    valorNumber = valorNumber.toFixed(2);

    let item = {
        banco: values.banco,
        agencia: values.agencia,
        conta: values.conta,
        nome: values.nome,
        cpf: values.cpf,
        descricao: 'Transferência Bancária',
        valor: '-' + valorNumber,
        data: dateString,
        tipo: 'Despesa'
    };
    addTransaction(item, context);
    handleEmpty(values);

}

function handleDate() {
    let date = new Date();
    var data = date.getDate();
    var month = date.getMonth();
    var year = date.getFullYear();

    //O mês começa em 0 e termina em 11, por isso a adição
    var dateString = data + "/" + (month + 1) + "/" + year;
    return dateString


};

function handleEmpty(values) {
    values.banco = '';
    values.agencia = '';
    values.conta = '';
    values.nome = '';
    values.cpf = '';
    values.valor = '';


}
