const React = require('react');

const defaultProps = { classes: '' };

export class Day extends React.Component {
  onClick() {
    if (this.props.onClick) {
      this.props.onClick(this.props.day.day);
    }
  }

  render() {
    return (
      <td
        onClick={this.onClick.bind(this)}
        className={this.props.day.classes}
      >
        <span className="day-number">
          {this.props.day.day.date()}
        </span>
      </td>
    );
  }
}

Day.defaultProps = defaultProps;
