import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import { Calendar, CalendarControls } from 'react-yearly-calendar';
import './style.css';

class Demo extends React.Component {
  constructor(props) {
    super(props);

    const today = moment();

    const customCSSclasses = {
      holidays: ['2018-04-25', '2018-05-01', '2018-06-02', '2018-08-15', '2018-11-01'],
      spring: {
        start: '2018-03-21',
        end: '2018-6-20'
      },
      summer: {
        start: '2018-06-21',
        end: '2018-09-22'
      },
      autumn: {
        start: '2018-09-23',
        end: '2018-12-21'
      },
      weekend: 'Sat,Sun',
      winter: day => day.isBefore(moment([2018, 2, 21])) || day.isAfter(moment([2018, 11, 21]))
    };
    // alternatively, customClasses can be a function accepting a moment object. For example:
    // day => (day.isBefore(moment([day.year(),2,21])) || day.isAfter(moment([day.year(),11,21]))) ? 'winter': 'summer'

    this.state = {
      year: today.year(),
      selectedDay: today,
      selectedRange: [today, moment(today).add(15, 'day')],
      showDaysOfWeek: true,
      showTodayBtn: true,
      showWeekSeparators: true,
      selectRange: false,
      firstDayOfWeek: 0, // sunday
      customCSSclasses
    };
  }

  onPrevYear() {
    this.setState(prevState => ({
      year: prevState.year - 1
    }));
  }

  onNextYear() {
    this.setState(prevState => ({
      year: prevState.year + 1
    }));
  }

  goToToday() {
    const today = moment();

    this.setState({
      selectedDay: today,
      selectedRange: [today, moment(today).add(15, 'day')],
      year: today.year()
    });
  }

  datePicked(date) {
    this.setState({
      selectedDay: date,
      selectedRange: [date, moment(date).add(15, 'day')]
    });
  }

  rangePicked(start, end) {
    this.setState({
      selectedRange: [start, end],
      selectedDay: start
    });
  }

  toggleShowDaysOfWeek() {
    this.setState(prevState => ({
      showDaysOfWeek: !prevState.showDaysOfWeek
    }));
  }

  toggleForceFullWeeks() {
    this.setState(prevState => ({
      showDaysOfWeek: true,
      forceFullWeeks: !prevState.forceFullWeeks
    }));
  }

  toggleShowTodayBtn() {
    this.setState(prevState => ({
      showTodayBtn: !prevState.showTodayBtn
    }));
  }

  toggleShowWeekSeparators() {
    this.setState(prevState => ({
      showWeekSeparators: !prevState.showWeekSeparators
    }));
  }

  toggleSelectRange() {
    this.setState(prevState => ({
      selectRange: !prevState.selectRange
    }));
  }

  selectFirstDayOfWeek(event) {
    this.setState({
      firstDayOfWeek: parseInt(event.target.value, 10)
    });
  }

  render() {
    const {
      year,
      showTodayBtn,
      selectedDay,
      showDaysOfWeek,
      forceFullWeeks,
      showWeekSeparators,
      firstDayOfWeek,
      selectRange,
      selectedRange,
      customCSSclasses
    } = this.state;

    return (
      <div>
        <div id="calendar">
          <CalendarControls
            year={year}
            showTodayButton={showTodayBtn}
            onPrevYear={() => this.onPrevYear()}
            onNextYear={() => this.onNextYear()}
            goToToday={() => this.goToToday()}
          />
          <Calendar
            year={year}
            selectedDay={selectedDay}
            showDaysOfWeek={showDaysOfWeek}
            forceFullWeeks={forceFullWeeks}
            showWeekSeparators={showWeekSeparators}
            firstDayOfWeek={firstDayOfWeek}
            selectRange={selectRange}
            selectedRange={selectedRange}
            onPickDate={(date, classes) => this.datePicked(date, classes)}
            onPickRange={(start, end) => this.rangePicked(start, end)}
            customClasses={customCSSclasses}
          />
        </div>

        <h5>
          Proudly brought to you by <a href="http://belka.us/en">Belka</a>
        </h5>

        <div className="options">
          <b>Demo Options</b>
          <br />
          <ul>
            <li>
              <label htmlFor="firstDayOfWeek">First day of week</label>
              <select id="firstDayOfWeek" value={firstDayOfWeek} onChange={e => this.selectFirstDayOfWeek(e)}>
                {[0, 1, 2, 3, 4, 5, 6].map(i => (
                  <option key={i} value={i}>
                    {moment()
                      .weekday(i)
                      .format('ddd')}
                  </option>
                ))}
              </select>
            </li>
            <li>
              <input id="selectRange" type="checkbox" checked={selectRange} onChange={() => this.toggleSelectRange()} />
              <label htmlFor="selectRange">Select Date range</label>
            </li>
          </ul>
          <br />
          <i>
            All these options (and more!) are available as Calendar props. Colors are assigned with an object mapping
            class names to week days, periods or single days.
          </i>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Demo />, document.getElementById('root'));
