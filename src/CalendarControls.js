const React = require('react');

export class CalendarControls extends React.Component {
  onNext() {
    this.props.onNext();
  }

  onPrev() {
    this.props.onPrev();
  }

  render() {
    return
      (
        <div className="clndr-controls">
          <div onClick={this.onPrev.bind(this)}>
            Prev
          </div>
          <div className="current-month">
            {this.props.date.format('MMMM YYYY').bind(this)}
          </div>
          <div onClick={this.onNext.bind(this)}>
            Next
          </div>
        </div>
      );
  }
}
