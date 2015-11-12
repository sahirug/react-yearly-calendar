const React = require('react');
const moment = require('moment');
const _ = require('underscore');
const Day = require('./Day').Day;
// const CalendarControls = require('./CalendarControls');

const propTypes = {
  year: React.PropTypes.number.isRequired,
  forceFullWeeks: React.PropTypes.bool,
  showDaysOfWeek: React.PropTypes.bool,
  onPickDate: React.PropTypes.func
};

const defaultProps = {
  year: moment().year(),
  forceFullWeeks: false,
  showDaysOfWeek: true,
  onPickDate: null,
  selectedDay: moment()
};

export class Calendar extends React.Component {
  constructor(props) {
    super(props);
  }

  days(month) {
    let date = moment(); // current day
    date.year(this.props.year); // set year
    date.month(month); // set desired month
    date = date.startOf('month');

    var days = [];

    // insert days before the start of the month
    const diff = date.weekday();
    for (let i = 0; i < diff; i++) {
      let day = moment([date.year(), date.month(), i-diff+1]);
      days.push({day: day, classes: 'prev-month'});
    }

    // insert days of month
    const numberOfDays = date.daysInMonth();
    for (let i = 1; i <= numberOfDays; i++) {
      let day = moment([date.year(), date.month(), i]);
      days.push({day: day, classes: day.isSame(this.props.selectedDay, 'day')? 'selected': ''});
    }

    // insert days at the end to match up 37 (max number of days in a month + 6)
    // or 42 (if user prefers seeing the week closing with Sunday)
    const totalDays = this.props.forceFullWeeks? 42: 37;
    let i = 1;
    while (days.length < totalDays) {
      let day = moment([date.year(), date.month(), numberOfDays+i]);
      days.push({day: day, classes: 'next-month'});
      i++;
    }

    return days;
  }


  monthName(month) {
    var date = moment(); // current day
    date.year(this.props.year); // set year
    date.month(month); // set desired month

    return date.format('MMM');
  }

  daysOfWeek() {
    var daysOfWeek = [];
    const totalDays = this.props.forceFullWeeks? 42: 37;
    for (let i = 0; i < totalDays; i++) {
      daysOfWeek.push(moment().weekday(i).format('dd').charAt(0));
    }

    return daysOfWeek;
  }

  render() {
    let weekDays;
    if(this.props.showDaysOfWeek) {
      weekDays = (
        <tr>
          <th>
            &nbsp;
          </th>
          {this.daysOfWeek().map((day, i) => {
            return (
              <th key={'weekday-' + i} className={i%7==0? "bolder": ""}>
                {day}
              </th>
            );
          })}
        </tr>
      );
    }

    const months  = _.range(0,12).map((month, i) => {
      return (
        <tr key={'month' + i}>
          <td>
            {this.monthName(month)}
          </td>
          {this.days(month).map((day, i) => {
            return <Day key={'day-' + i} day={day} onClick={this.props.onPickDate} />;
          })}
        </tr>
      );
    });

    return (
      <table className='calendar'>
        <thead className='day-headers'>
          {weekDays}
        </thead>
        <tbody>
          {months}
        </tbody>
      </table>
    );
  }
}

Calendar.propTypes = propTypes;
Calendar.defaultProps = defaultProps;
