const React = require('react');

const propTypes = {
  classes: React.PropTypes.string,
  onClick: React.PropTypes.func
};

const defaultProps = {
  classes: ''
};

export class Day extends React.Component {
  onClick() {
    if (this.props.onClick) {
      this.props.onClick(this.props.day);
    }
  }

  render() {
    return (
      <td
        onClick={this.onClick.bind(this)}
        className={this.props.classes}
      >
        <span className='day-number'>
          {this.props.day.date()}
        </span>
      </td>
    );
  }
}

Day.propTypes = propTypes;
Day.defaultProps = defaultProps;
