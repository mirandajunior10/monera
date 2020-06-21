export default function handleCancel(context) {
    context.setState({
      stocksSuggestions: [],
      modalVisible: false,
      receitaOverlay: false,
      despesaOverlay: false,
      descricao: '',
      selected: false,
      selectedStock: '',
      quantidade: '',
      valor: '',
      data: ''
    });
  };