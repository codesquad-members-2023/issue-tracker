import React from 'react';
import PropTypes from 'prop-types';

import { $Label } from './style';
import Icon from '../Icon';

const Label = ({ height, name, fontColor, backgroundColor, iconName }) => {
  // TODO: 옆에 아이콘 넣기 해야함.
  return (
    <$Label height={height} textcolor={fontColor} backgroundcolor={backgroundColor}>
      {iconName && <Icon name={iconName} fill="#FEFEFE" />}
      {name}
    </$Label>
  );
};

Label.propTypes = {
  height: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  fontColor: PropTypes.string.isRequired,
  backgroundColor: PropTypes.string.isRequired,
  iconName: PropTypes.string,
};

export default Label;
