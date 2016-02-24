import React from 'react';

const propTypes = {
  classes: React.PropTypes.string,
  onClick: React.PropTypes.func.required,
  onHover: React.PropTypes.func
};

const defaultProps = {
  classes: ''
};

export class Day extends React.Component {
  _onClick() {
    const { onClick, day } = this.props;
    onClick(day);
  }

  _onHover() {
    const { onHover, day } = this.props;
    onHover && onHover(day);
  }

  render() {
    const { classes, day } = this.props;
    return (
      <td
        onClick={this._onClick.bind(this)}
        onMouseEnter={this._onHover.bind(this)}
        className={classes}
      >
        <span className='day-number'>
          {isNaN(day.date())? "": day.date()}
        </span>
      </td>
    );
  }
}

Day.propTypes = propTypes;
Day.defaultProps = defaultProps;
