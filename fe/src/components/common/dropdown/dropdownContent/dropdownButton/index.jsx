import React from 'react';
import DropdownIcon from '@assets/icons/DropdownIcon.svg';
import DropdownButtonBlock from './style';

const DropdownButton = ({ buttonName, dropdownStyle, onClick }) => {
  return (
    <DropdownButtonBlock onClick={onClick} dropdownStyle={dropdownStyle}>
      {buttonName}
      <img src={DropdownIcon} alt={DropdownIcon} />
    </DropdownButtonBlock>
  );
};

export default DropdownButton;
