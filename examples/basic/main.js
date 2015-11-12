const React = require('react');
const ReactDOM = require('react-dom');
const {Calendar} = require('react-yearly-calendar');

var selectedDay;

function datePicked(date) {
  console.log("You selected: " + date.format("DD/MMM/YY"));
  selectedDay = date;
}

ReactDOM.render(
  <Calendar.Calendar
    showDaysOfWeek={true}
    onPickDate={datePicked}
    selectedDay={selectedDay}
  />,
  document.getElementById('calendar')
);
