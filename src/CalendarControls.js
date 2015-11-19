import React from 'react';

const propTypes = {
  year: React.PropTypes.number.isRequired,
  onPrevYear: React.PropTypes.func,
  onNextYear: React.PropTypes.func,
  goToToday: React.PropTypes.func,
  showTodayButton: React.PropTypes.bool
};

export default class CalendarControls extends React.Component {
  render() {
    const { showTodayButton, goToToday, onPrevYear, onNextYear } = this.props;
    let todayButton;
    if( showTodayButton ) {
      todayButton = (
        <div
          className='control today'
          onClick={() => goToToday()}
        >
          Today
        </div>
      );
    }

    return (
      <div className='calendar-controls'>
        <div
          className='control'
          onClick={() => onPrevYear()}
        >
          &laquo;
        </div>
        <div className='current-year'>
          {this.props.year}
        </div>
        <div
          className='control'
          onClick={() => onNextYear()}
        >
          &raquo;
        </div>
        {todayButton}
      </div>
    );
  }
}

CalendarControls.propTypes = propTypes;
