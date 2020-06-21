import addTransaction from './addTransaction'
import addStockTransaction from './addStockTransaction'
import handleCancel from './handleCancel'

//id diz respeito ao tipo de operação, 1 é compra, 2 é venda
export default async function handleAddTransaction(context, id) {

    //Converte as string de valor para inteiro/float pra facilidar o tratamento de dados
    let valorNumber = context.state.valor.replace(',', '.')
    valorNumber = Number(valorNumber);
    valorNumber = valorNumber.toFixed(2)

    if (id === 1) {
        let item = {
            descricao: context.state.descricao,
            valor: valorNumber,
            data: context.state.data,
            tipo: 'Receita'
        };
        await addTransaction(item, context);

    } else if (id === 2) {
        let item = {
            descricao: context.state.descricao,
            valor: '-' + valorNumber,
            data: context.state.data,
            tipo: 'Despesa'
        };
        await addTransaction(item, context);

    }
    if (id === 3) {
        let item = {
            descricao: "Compra de " + context.state.selectedStock,
            quantidade: context.state.quantidade,
            valor: valorNumber,
            data: context.state.data,
            tipo: 'Compra'
        };
        await addStockTransaction(item, context);

    }

    handleCancel(context)
}