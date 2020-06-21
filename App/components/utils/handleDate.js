
  export default function handleDate(context, event, date) {
    context.setState({ show: false })
    if (date === undefined) {
      context.setState({ data: '' })
    }
    else {
  
      var data = date.getDate();
      var month = date.getMonth();
      var year = date.getFullYear();
  
      //O mês começa em 0 e termina em 11, por isso a adição
      var dateString = data + "/" + (month + 1) + "/" + year;
      context.setState({ data: dateString })
    }
  
  };