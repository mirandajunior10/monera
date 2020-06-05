import { database, auth } from '../../config/config';

export async function addTransaction(transaction) {
    var newTransactionKey = database.ref('users/' + auth.currentUser.uid + '/transactions').child('posts').push().key;

    var updates = {};


    updates['users/' + auth.currentUser.uid + '/transactions/' + newTransactionKey] = transaction;
    database.ref().update(updates).then(async function (snapshot) {
        console.log('Transferência adicionada')
    }).catch(function (error) {
        console.log(error);
    })
}


//id diz respeito ao tipo de operação, 1 é receita, 2 é despesa
export async function handleAddTransaction(context, values) {
    let dateString = handleDate()
    let valorNumber = values.valor.replace(',', '.')
    valorNumber = Number(valorNumber);
    valorNumber = valorNumber.toFixed(2);
    let nome = values.nome.split(" ", 1);

    let item = {
        banco: values.banco,
        agencia: values.agencia,
        conta: values.conta,
        nome: values.nome,
        cpf: values.cpf,
        descricao: 'Transferência para ' + nome,
        valor: '-' + values.valor,
        data: dateString,
        tipo: 'Despesa'
    };
    await addTransaction(item, context);
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

function handleEmpty(values){
    values.banco = '';
    values.agencia = '';
    values.conta = '';
    values.nome = '';
    values.cpf = '';
    values.valor = '';
 
  
}
