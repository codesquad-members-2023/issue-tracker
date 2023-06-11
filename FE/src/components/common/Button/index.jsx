import React from 'react';
import PropTypes from 'prop-types';

import { $Button } from './style';

const Button = ({ children, className = '', type, size, active = false, ...props }) => {
  return (
    <$Button className={className} $type={type} size={size} active={active ? 1 : undefined} {...props}>
      {children}
    </$Button>
  );
};

Button.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.node), PropTypes.node])
    .isRequired,
  className: PropTypes.string,
  type: PropTypes.oneOf(['contained', 'outline', 'ghost']).isRequired,
  size: PropTypes.oneOf(['L', 'M', 'S']).isRequired,
  active: PropTypes.bool,
};

export default Button;
