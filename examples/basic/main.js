const React = require('react');
const ReactDOM = require('react-dom');
const moment = require('moment');
const {Calendar, CalendarControls} = require('react-yearly-calendar');

class Demo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      year: moment().year(),
      selectedDay: moment(),
      showDaysOfWeek: true,
      showTodayBtn: true,
      selectRange: false,
      firstDayOfWeek: 0 // sunday
    };
  }

  onPrevYear() {
    this.setState({ year: this.state.year-1 });
  }

  onNextYear() {
    this.setState({ year: this.state.year+1 });
  }

  goToToday() {
    this.setState({
      selectedDay: moment(),
      year: moment().year()
    });
  }

  datePicked(date) {
    this.setState({ selectedDay: date });
  }

  toggleShowDaysOfWeek() {
    this.setState({ showDaysOfWeek: !this.state.showDaysOfWeek });
  }

  toggleForceFullWeeks(){
    var next_forceFullWeeks = !this.state.forceFullWeeks;
    this.setState({
      showDaysOfWeek: next_forceFullWeeks,
      forceFullWeeks: next_forceFullWeeks
    });
  }

  toggleShowTodayBtn() {
    this.setState({ showTodayBtn: !this.state.showTodayBtn });
  }

  toggleSelectRange() {
    this.setState({ selectRange: !this.state.selectRange });
  }

  selectFirstDayOfWeek(e) {
    this.setState({ firstDayOfWeek: parseInt(event.target.value) });
  }

  render() {
    return (
      <div>
        <div id='calendar'>
          <CalendarControls
            year={this.state.year}
            showTodayButton={this.state.showTodayBtn}
            onPrevYear={this.onPrevYear.bind(this)}
            onNextYear={this.onNextYear.bind(this)}
            goToToday={this.goToToday.bind(this)}
          />
          <Calendar
            year={this.state.year}
            selectedDay={this.state.selectedDay}
            showDaysOfWeek={this.state.showDaysOfWeek}
            forceFullWeeks={this.state.forceFullWeeks}
            firstDayOfWeek={this.state.firstDayOfWeek}
            selectRange={this.state.selectRange}
            selectedRange={[moment([2015,2,15]), moment([2015,3,14])]}
            onPickDate={this.datePicked.bind(this)}
          />
        </div>

        <h5>Proudly brought to you by <a href="http://belka.us/en">Belka</a></h5>

        <div className='options'>
          <b>Options</b>
          <br />
          <ul>
            <li>
              <input
                id='showDaysOfWeek'
                type='checkbox'
                onChange={this.toggleShowDaysOfWeek.bind(this)}
                checked={this.state.showDaysOfWeek}
              />
              <label htmlFor='showDaysOfWeek'>Show days of week</label>
            </li>
            <li>
              <input
                id='forceFullWeeks'
                type='checkbox'
                onChange={this.toggleForceFullWeeks.bind(this)}
                checked={this.state.forceFullWeeks}
              />
              <label htmlFor='forceFullWeeks'>Force full weeks</label>
            </li>
            <li>
              <input
                id='showTodayBtn'
                type='checkbox'
                onChange={this.toggleShowTodayBtn.bind(this)}
                checked={this.state.showTodayBtn}
              />
              <label htmlFor='showTodayBtn'>Show 'Today' button</label>
            </li>
            <li>
              <label htmlFor='firstDayOfWeek'>First day of week</label>
              <select
                id='firstDayOfWeek'
                onChange={(e) => this.selectFirstDayOfWeek(e)}
                value={this.state.firstDayOfWeek}
              >
                {[0,1,2,3,4,5,6].map( i =>
                  <option value={i}>{moment().weekday(i).format("ddd")}</option>
                )}
              </select>
            </li>
            <li>
              <input
                id='selectRange'
                type='checkbox'
                onChange={this.toggleSelectRange.bind(this)}
                checked={this.state.selectRange}
              />
              <label htmlFor='selectRange'>Select Date range</label>
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
