import { database, auth } from '../../config/config';

export async function addTransactions(transaction, context) {
    console.log("chegou aqui")
    var newTransactionKey = database.ref('users/' + auth.currentUser.uid + '/transactions').child('posts').push().key;

    var updates = {};
    console.log('uid', auth.currentUser.uid);
    updates['users/' + auth.currentUser.uid + '/transactions/' + newTransactionKey] = transaction;
    database.ref().update(updates).then(async function(snapshot){
        await fetchTransactions(auth.currentUser, context);
    }).catch(function(error){
        console.log(error);
    })
}

export async function fetchTransactions(user, context) {
    console.log('uid', user.uid);

    database.ref('users/' + user.uid + '/transactions').once("value").then(function(snapshot) {

       var transactions = Object.entries(snapshot.val());
       console.log(transactions);

       transactions.map((stock) => ({
        index: stock[0],
        item: stock[1]
    }));

    
    context.setState({
        transactions
    });


    }).catch(function(error) {
        console.log(error)

    });
}


export async function handleAddTransactions(context, id) {
    if(id === 1) {
      let item = {
        descricao: context.state.descricao, 
        valor: context.state.valor,
        data: context.state.data,
      };

      //let itens = context.state.itens;
      //itens.push(item);
      //context.setState({vetor : itens})     
      await addTransactions(item, context);

    } else {
      let item = {
        descricao: context.state.descricao, 
        valor: '-' + context.state.valor,
        data: context.state.data,
      };
      //let itens = context.state.itens;
      //itens.push(item);
      //context.setState({vetor : itens})
      await addTransactions(item, context);

    }
    handleCancel(context)
  }

  export function  handleCancel(context) {
    context.setState({
      dialogReceitaVisible: false,
      dialogDespesaVisible: false,
      valor: '',
      descricao: '',
      data: '',
       });
  };

  export function handleDate(context, event, date) {
    context.setState({ show: false })
    if (date === undefined) {
        context.setState({data: ''})
    }
    else {

      var data = date.getDate();
      var month = date.getMonth(); //Be careful! January is 0 not 1
      var year = date.getFullYear();

      var dateString = data + "/" + (month + 1) + "/" + year;
      context.setState({ data: dateString })
    }

  };

  export function handleAction(context,name) {
    switch (name) {
      case 'add_receita':
        context.setState({ dialogReceitaVisible: true });
        break;
      case 'add_despesa':
        context.setState({ dialogDespesaVisible: true });
      default:
        break;
    }
  }

