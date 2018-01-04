import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import { Calendar, CalendarControls } from 'react-yearly-calendar';
import safeEval from 'notevil';
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

  updateClasses() {
    const { customCSSclasses } = this.state;
    const input = this.customClassesInput.value;
    const context = { customCSSclasses, moment };

    try {
      safeEval(input, context);

      const nextCustomCSSclasses = context.customCSSclasses;
      this.setState({
        customCSSclasses: nextCustomCSSclasses,
        customClassesError: false
      });
    } catch (e) {
      this.setState({
        customClassesError: true
      });
      throw e;
    }
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
          <div className="half">
            <b>Demo Options</b>
            <br />
            <ul>
              <li>
                <input
                  id="showDaysOfWeek"
                  type="checkbox"
                  checked={showDaysOfWeek}
                  onChange={() => this.toggleShowDaysOfWeek()}
                />
                <label htmlFor="showDaysOfWeek">Show days of week</label>
              </li>
              <li>
                <input
                  id="forceFullWeeks"
                  type="checkbox"
                  checked={forceFullWeeks}
                  onChange={() => this.toggleForceFullWeeks()}
                />
                <label htmlFor="forceFullWeeks">Force full weeks</label>
              </li>
              <li>
                <input
                  id="showTodayBtn"
                  type="checkbox"
                  checked={showTodayBtn}
                  onChange={() => this.toggleShowTodayBtn()}
                />
                <label htmlFor="showTodayBtn">Show &apos;Today&apos; button</label>
              </li>
              <li>
                <input
                  id="showWeekSeparators"
                  type="checkbox"
                  checked={showWeekSeparators}
                  onChange={() => this.toggleShowWeekSeparators()}
                />
                <label htmlFor="showWeekSeparators">Show week separators</label>
              </li>
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
                <input
                  id="selectRange"
                  type="checkbox"
                  checked={selectRange}
                  onChange={() => this.toggleSelectRange()}
                />
                <label htmlFor="selectRange">Select Date range</label>
              </li>
            </ul>
            <br />
            <i>
              All these options are available as Calendar props. Colors are assigned with<br />
              an object mapping class names to week days, periods or single days.
            </i>
          </div>
          <div className="half">
            <b>Custom classes mapping</b>
            <p className="interactiveDemo">
              Available classes (already styled in the CSS) are: <i>holidays</i>, <i>spring</i>, <i>summer</i>,<br />
              <i>autumn</i>, <i>winter</i>, <i>weekend</i>. Other classes will be applied, but will have<br />
              no visual difference until you apply some styling to them.
            </p>
            <textarea
              ref={r => {
                this.customClassesInput = r;
              }}
              className={this.state.customClassesError ? 'error' : ''}
            >
              {`customCSSclasses = {
    holidays: [
      '2018-04-25',
      '2018-05-01',
      '2018-06-02',
      '2018-08-15',
      '2018-11-01'
    ],
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
    winter: function(day) { return day.isBefore( moment([2018,2,21]) ) || day.isAfter( moment([2018,11,21])) }
  }`}
            </textarea>
            <button onClick={() => this.updateClasses()}>Update</button>
            <a
              href="https://github.com/BelkaLab/react-yearly-calendar#custom-daysperiods-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              Reference
            </a>
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Demo />, document.getElementById('root'));
