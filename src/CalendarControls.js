const React = require('react');

const propTypes = {
  year: React.PropTypes.number.isRequired,
  onPrevYear: React.PropTypes.func,
  onNextYear: React.PropTypes.func,
  goToToday: React.PropTypes.func,
  showTodayButton: React.PropTypes.bool
};

export default class CalendarControls extends React.Component {
  constructor(props) {
    super(props);
  }

  onNextYear() {
    this.props.onNextYear();
  }

  onPrevYear() {
    this.props.onPrevYear();
  }

  goToToday() {
    this.props.goToToday();
  }

  render() {
    let todayButton;
    if( this.props.showTodayButton ) {
      todayButton = (
        <div
          className='control today'
          onClick={this.goToToday.bind(this)}
        >
          Today
        </div>
      );
    }

    return (
      <div className='calendar-controls'>
        <div
          className='control'
          onClick={this.onPrevYear.bind(this)}
        >
          &laquo;
        </div>
        <div className='current-year'>
          {this.props.year}
        </div>
        <div
          className='control'
          onClick={this.onNextYear.bind(this)}
        >
          &raquo;
        </div>
        {todayButton}
      </div>
    );
  }
}

CalendarControls.propTypes = propTypes;
