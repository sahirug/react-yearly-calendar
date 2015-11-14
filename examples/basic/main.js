const React = require('react');
const ReactDOM = require('react-dom');
const moment = require('moment');
const {Calendar} = require('react-yearly-calendar').Calendar;
const {CalendarControls} = require('react-yearly-calendar').CalendarControls;

class Demo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      year: moment().year(),
      selectedDay: moment(),
      showDaysOfWeek: true
    };
  }

  onPrevYear() {
    this.setState({ year: this.state.year-1 });
  }

  onNextYear() {
    this.setState({ year: this.state.year+1 });
  }

  datePicked(date) {
    this.setState({ selectedDay: date });
  }

  showDaysOfWeek() {
    this.setState({ showDaysOfWeek: !this.state.showDaysOfWeek });
  }
  forceFullWeeks(){
    this.setState({
      showDaysOfWeek: true,
      forceFullWeeks: !this.state.forceFullWeeks
    });
  }

  render() {
    return (
      <div>
        <div id='calendar'>
          <CalendarControls
            year={this.state.year}
            onPrev={this.onPrevYear.bind(this)}
            onNext={this.onNextYear.bind(this)}
          />
          <Calendar
            year={this.state.year}
            selectedDay={this.state.selectedDay}
            showDaysOfWeek={this.state.showDaysOfWeek}
            forceFullWeeks={this.state.forceFullWeeks}
            onPickDate={this.datePicked.bind(this)}
          />
        </div>

        <div className='options'>
          <b>Options</b>
          <br />
          <ul>
            <li>
              <input
                id='showDaysOfWeek'
                type='checkbox'
                onChange={this.showDaysOfWeek.bind(this)}
                checked={this.state.showDaysOfWeek}
              />
              <label htmlFor='showDaysOfWeek'>Show days of week</label>
            </li>
            <li>
              <input
                id='forceFullWeeks'
                type='checkbox'
                onChange={this.forceFullWeeks.bind(this)}
                checked={this.state.forceFullWeeks}
              />
              <label htmlFor='forceFullWeeks'>Force full weeks</label>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <Demo />,
  document.getElementById('demo')
);
