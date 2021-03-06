$(function () {
  $("#from").datepicker({
    dateFormat: "yy-mm-dd",
    changeMonth: true,
    numberOfMonths: 1,
    onClose: function (selectedDate) {
      $("#to").datepicker("option", "minDate", selectedDate);
    }
  });
  $("#to").datepicker({
    dateFormat: "yy-mm-dd",
    changeMonth: true,
    numberOfMonths: 1,
    onClose: function (selectedDate) {
      $("#from").datepicker("option", "maxDate", selectedDate);
    }
  });
});

function myFunc() {
  var from = document.getElementById("from").value;
  var to = document.getElementById("to").value;
  // var dayFrom = $.datepicker.parseDate( "yy-mm-dd", from );
  // var dayTo = $.datepicker.parseDate( "yy-mm-dd", to );
  var range = DateDiff(from, to);
  document.getElementById("dayFrom").innerHTML = from;
  document.getElementById("dayTo").innerHTML = to;
  document.getElementById("range").innerHTML = range;
}


function DateDiff(from, to) {     // from, to are format: 2018-01-01;
  var dateTemp, dateFrom, dateTo, days;
  dateTemp = from.split("-");
  dateFrom = new Date(dateTemp[1] + '-' + dateTemp[2] + '-' + dateTemp[0]);    // Change to format: 12-18-2017
  dateTemp = to.split("-");
  dateTo = new Date(dateTemp[1] + '-' + dateTemp[2] + '-' + dateTemp[0]);
  days = parseInt(Math.abs(dateFrom - dateTo) / 1000 / 60 / 60 / 24);    // Change milliseconds to days
  return days;
}
