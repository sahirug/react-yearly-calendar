const React = require('react');
const moment = require('moment');
const _ = require('underscore');
const Day = require('./Day').Day;

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

  monthDays(month) {
    const monthStart = moment([this.props.year, month, 1]); // current day

    // number of days to insert before the first of the month to correctly align the weekdays
    const prevMonthDaysCount = monthStart.weekday();
    // days in month
    const numberOfDays = monthStart.daysInMonth();
    // insert days at the end to match up 37 (max number of days in a month + 6)
    // or 42 (if user prefers seeing the week closing with Sunday)
    const totalDays = this.props.forceFullWeeks? 42: 37;

    // day-generating loop
    return _.range(1, totalDays+1).map( i => {
      let day = moment([this.props.year, month, i - prevMonthDaysCount]);

      // pick appropriate classes
      let classes = [];
      if( i <= prevMonthDaysCount ) {
        classes.push('prev-month');
      } else if ( i > (numberOfDays + prevMonthDaysCount) ) {
        classes.push('next-month');
      } else {
        // 'selected' class sholud be applied only to days in this month
        if( day.isSame(this.props.selectedDay, 'day') ) {
          classes.push('selected');
        }
      }

      if( (i-1)%7==0 ) {
        classes.push('bolder');
      }

      return (
        <Day
          key={'day-' + i}
          day={day}
          classes={classes.join(' ')}
          onClick={this.props.onPickDate}
        />
      );
    });
  }

  monthName(month) {
    let date = moment([this.props.year, month, 1]);

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
              <th
                key={'weekday-' + i}
                className={i%7==0? 'bolder': ''}
              >
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
          <td className='month-name'>
            {this.monthName(month)}
          </td>
          {this.monthDays(month)}
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
