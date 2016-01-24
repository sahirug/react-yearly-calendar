import React from 'react';
import moment from 'moment';
import { Day } from './Day';

const propTypes = {
  year: React.PropTypes.number.isRequired,
  forceFullWeeks: React.PropTypes.bool,
  showDaysOfWeek: React.PropTypes.bool,
  firstDayOfWeek: React.PropTypes.number,
  selectRange: React.PropTypes.bool,
  onPickDate: React.PropTypes.func,
  onPickRange: React.PropTypes.func
};

const defaultProps = {
  year: moment().year(),
  forceFullWeeks: false,
  showDaysOfWeek: true,
  firstDayOfWeek: 0,
  selectRange: false,
  onPickDate: null,
  onPickRange: null,
  selectedDay: moment()
};

// Grabbed from the underscore.js source code (https://github.com/jashkenas/underscore/blob/master/underscore.js#L691)
let range = function(start, stop, step) {
  if (stop == null) {
    stop = start || 0;
    start = 0;
  }
  step = step || 1;

  var length = Math.max(Math.ceil((stop - start) / step), 0);
  var range = Array(length);

  for (var idx = 0; idx < length; idx++, start += step) {
    range[idx] = start;
  }

  return range;
};

export default class Calendar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectingRange: undefined
    }
  }

  _dayClicked(date) {
    let { selectingRange } = this.state;
    const { selectRange, onPickRange, onPickDate } = this.props;

    if( !selectRange ) {
      onPickDate && onPickDate(date);
      return;
    }

    if( !selectingRange ) {
      selectingRange = [date, date];
    } else {
      onPickRange && onPickRange(selectingRange[0], date);
      selectingRange = undefined;
    }

    this.setState({
      selectingRange
    })
  }

  _dayHovered(hoveredDay) {
    let { selectingRange } = this.state;

    if( selectingRange ) {
      selectingRange[ 1 ] = hoveredDay;

      this.setState({
        selectingRange
      });
    }
  }

  _monthDays(month) {
    const { year, forceFullWeeks, selectedDay, onPickDate, firstDayOfWeek, selectRange, selectedRange } = this.props;
    const { selectingRange } = this.state;
    const monthStart = moment([year, month, 1]); // current day

    // number of days to insert before the first of the month to correctly align the weekdays
    let prevMonthDaysCount = monthStart.weekday();
    while ( prevMonthDaysCount < firstDayOfWeek ) {
      prevMonthDaysCount += 7;
    }
    // days in month
    const numberOfDays = monthStart.daysInMonth();
    // insert days at the end to match up 37 (max number of days in a month + 6)
    // or 42 (if user prefers seeing the week closing with Sunday)
    const totalDays = forceFullWeeks? 42: 37;

    // day-generating loop
    return range(firstDayOfWeek + 1, totalDays+firstDayOfWeek+1).map( i => {
      let day = moment([year, month, i - prevMonthDaysCount]);

      // pick appropriate classes
      let classes = [];
      if( i <= prevMonthDaysCount ) {
        classes.push('prev-month');
      } else if ( i > (numberOfDays + prevMonthDaysCount) ) {
        classes.push('next-month');
      } else {
        if(selectRange) {
          // selectingRange is used while user is selecting a range
          // (has clicked on start day, and is hovering end day - but not yet clicked)
          let start = (selectingRange || selectedRange)[0];
          let end = (selectingRange || selectedRange)[1];

          // validate range
          if( end.isBefore(start) ) {
            start = (selectingRange || selectedRange)[1];
            end = (selectingRange || selectedRange)[0];
          }

          if( day.isBetween(start, end, 'day') ) {
            classes.push('range');
          }

          if( day.isSame(start, 'day') ) {
            classes.push('range');
            classes.push('range-left');
          }
          else if( day.isSame(end, 'day') ) {
            classes.push('range');
            classes.push('range-right');
          }
        }
        else {
          if( day.isSame(selectedDay, 'day') ) {
            classes.push('selected');
          }
        }
      }

      if( (i-1)%7 === 0 ) {
        // sunday
        classes.push('bolder');
      }

      return (
        <Day
          key={`day-${i}`}
          day={day}
          classes={classes.join(' ')}
          onClick={this._dayClicked.bind(this)}
          onHover={selectRange ? this._dayHovered.bind(this) : null}
        />
      );
    });
  }

  _monthName(month, year) {
    return moment([year, month, 1]).format('MMM');
  }

  _daysOfWeek() {
    const { firstDayOfWeek, forceFullWeeks } = this.props;
    const totalDays = forceFullWeeks? 42: 37;

    return (
      <tr>
        <th>
          &nbsp;
        </th>
        {
          range(firstDayOfWeek, totalDays + firstDayOfWeek).map( i => {
            let day = moment().weekday(i).format('dd').charAt(0);

            return (
              <th
                key={'weekday-' + i}
                className={(i+firstDayOfWeek)%7==0? 'bolder': ''}
              >
                {day}
              </th>
            )
          })
        }
      </tr>
    )
  }

  render() {
    const { year, firstDayOfWeek } = this.props;

    const months = range(0,12).map((month, i) => {
      return (
        <tr key={`month-${i}`} >
          <td className='month-name'>
            {this._monthName(month, year)}
          </td>
          {this._monthDays(month)}
        </tr>
      );
    });

    return (
      <table className='calendar'>
        <thead className='day-headers'>
          {this.props.showDaysOfWeek ? this._daysOfWeek() : null}
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
