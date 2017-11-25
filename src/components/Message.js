import React from 'react';
import PropTypes from 'prop-types';
import FaCheckCircle from 'react-icons/lib/fa/check-circle';
import FaExclamationCircle from 'react-icons/lib/fa/exclamation-circle';
import FaClockO from 'react-icons/lib/fa/clock-o';

const Message = (props) => {
  if (props.type === 'success'){
    return (
      <div className="success-color Message"><FaCheckCircle/>{props.text}</div>
    )
  }else if (props.type === 'error'){
    return (
      <div className="error-color Message"><FaExclamationCircle/>{props.text}</div>
    )
  }else if (props.type === 'pending'){
    return (
      <div className="Message"><FaClockO/>{props.text}</div>
    )
  }
}

Message.propTypes = {
  text: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired
};

export default Message;
