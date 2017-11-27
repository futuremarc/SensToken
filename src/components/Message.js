import React from 'react';
import PropTypes from 'prop-types';
import FaCheckCircle from 'react-icons/lib/fa/check-circle';
import FaExclamationCircle from 'react-icons/lib/fa/exclamation-circle';
import FaClockO from 'react-icons/lib/fa/clock-o';
import injectSheet from 'react-jss';

const Message = (props) => {
  const {successColor, errorColor, message, alignIcon} = props.classes;
  const {text, type} = props;
  if (type === 'success') {
    return (
      <div className={`${successColor} ${message}`}>
        <FaCheckCircle className={alignIcon}/>
        {text}
      </div>
    )
  } else if (type === 'error') {
    return (
      <div className={`${errorColor} ${message}`}>
        <FaExclamationCircle className={alignIcon}/>
        {text}
      </div>
    )
  } else if (type === 'pending') {
    return (
      <div className={message}>
        <FaClockO className={alignIcon}/>
        {text}
      </div>
    )
  }
};

Message.propTypes = {
  text: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired
};

const styles = theme => ({
  message: {
    textTransform: 'uppercase',
    paddingTop: '10px'
  },
  successColor: theme.successColor,
  errorColor: theme.errorColor,
  alignIcon: {
    marginBottom: '3.2px',
    marginRight: '3.23px',
  }
});

export default injectSheet(styles)(Message);
