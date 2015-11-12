const React = require('react');
const moment = require('moment');
const _ = require('underscore');
const Day = require('./Day').Day;
// const CalendarControls = require('./CalendarControls');

const propTypes = {
  weekOffset: React.PropTypes.number,
  forceSixRows: React.PropTypes.bool,
  showDaysOfWeek: React.PropTypes.bool,
};

const defaultProps = {
  weekOffset: 0,
  forceSixRows: false,
  showDaysOfWeek: false,
  onPickDate: null,
  year: moment().year(),
  selectedDay: moment()
};

export class Calendar extends React.Component {
  constructor(props) {
    super(props);
  }

  days(month) {
    var date = moment(); // current day
    date.year(this.props.year); // set year
    date.month(month); // set desired month
    date = date.startOf('month');

    var days = [];
    var diff = date.weekday() - this.props.weekOffset;
    if (diff < 0) diff += 7;

    for (let i = 0; i < diff; i++) {
      let day = moment([date.year(), date.month(), i-diff+1]);
      days.push({day: day, classes: 'prev-month'});
    }

    const numberOfDays = date.daysInMonth();
    for (let i = 1; i <= numberOfDays; i++) {
      let day = moment([date.year(), date.month(), i]);
      days.push({day: day});
    }

    let i = 1;
    while (days.length < 37) {
      let day = moment([date.year(), date.month(), numberOfDays+i]);
      days.push({day: day, classes: 'next-month'});
      i++;
    }

    if (this.props.forceSixRows && days.length !== 42) {
      let start = moment(days[days.length-1].date).add(1, 'days');
      while (days.length < 42) {
        days.push({day: moment(start), classes: 'next-month'});
        start.add(1, 'days');
      }
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
    var daysOfWeek = this.props.daysOfWeek;
    if (!daysOfWeek) {
      daysOfWeek = [];
      for (var i = 0; i < 37; i++) {
        daysOfWeek.push(moment().weekday(i).format('dd').charAt(0));
      }
    }
    return daysOfWeek;
  }

  render() {
    const daysOfWeek = this.daysOfWeek().map((day, i) => {
      return (
        <th key={'weekday-' + i} className={i%7==0? "bolder": ""}>
          {day}
        </th>
      );
    });

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
          <tr>
            <th>
              &nbsp;
            </th>
            {daysOfWeek}
          </tr>
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
