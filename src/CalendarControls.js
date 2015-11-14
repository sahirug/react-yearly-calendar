const React = require('react');

const propTypes = {
  year: React.PropTypes.number.isRequired,
  onPrev: React.PropTypes.func,
  onNext: React.PropTypes.func
};

export class CalendarControls extends React.Component {
  constructor(props) {
    super(props);
  }

  onNext() {
    this.props.onNext();
  }

  onPrev() {
    this.props.onPrev();
  }

  render() {
    return(
      <div className='calendar-controls'>
        <div
          className='control'
          onClick={this.onPrev.bind(this)}
        >
          &laquo;
        </div>
        <div className='current-year'>
          {this.props.year}
        </div>
        <div
          className='control'
          onClick={this.onNext.bind(this)}
        >
          &raquo;
        </div>
      </div>
    );
  }
}

CalendarControls.propTypes = propTypes;
