const React = require('react');
const ReactDOM = require('react-dom');
const {Calendar} = require('react-yearly-calendar');

function datePicked(date) {
  console.log(date);
}

console.log('Hello World')

ReactDOM.render(
  <Calendar.Calendar showDaysOfWeek={true}
            onPickDate={datePicked} />,
  document.getElementById('calendar')
);
