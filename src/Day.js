import React from 'react';

const propTypes = {
  classes: React.PropTypes.string,
  onClick: React.PropTypes.func
};

const defaultProps = {
  classes: ''
};

export class Day extends React.Component {
  _onClick() {
    const { onClick, day } = this.props;
    onClick && onClick(day);
  }

  render() {
    const { classes, day } = this.props;
    return (
      <td
        onClick={this._onClick.bind(this)}
        className={classes}
      >
        <span className='day-number'>
          {day.date()}
        </span>
      </td>
    );
  }
}

Day.propTypes = propTypes;
Day.defaultProps = defaultProps;
