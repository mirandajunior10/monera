export default function sortDescending(data){
    data.sort((a, b) => {
        let dateA = stringToDate(a[1].data, 'dd/MM/yyyy', '/')
        let dateB = stringToDate(b[1].data, 'dd/MM/yyyy', '/')
    
        return dateB - dateA;
      })

      return data
}

function stringToDate(_date, _format, _delimiter) {
    var formatLowerCase = _format.toLowerCase();
    var formatItems = formatLowerCase.split(_delimiter);
    var dateItems = _date.split(_delimiter);
    var monthIndex = formatItems.indexOf("mm");
    var dayIndex = formatItems.indexOf("dd");
    var yearIndex = formatItems.indexOf("yyyy");
    var month = parseInt(dateItems[monthIndex]);
    month -= 1;
    var formatedDate = new Date(dateItems[yearIndex], month, dateItems[dayIndex]);
    return formatedDate;
  }
  