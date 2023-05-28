import React from 'react';
import styled from 'styled-components';
import DropdownIcon from '../../../../assets/icons/DropdownIcon.svg';

const DropdownButtonBlock = styled.button`
  display: flex;
  align-items: center;
  gap: 5px;
  background-color: transparent;
  color: ${({ theme }) => theme.COLOR.GRAY600};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.BOLD};
`;

const DropdownButton = ({ buttonName, onClick }) => {
  return (
    <DropdownButtonBlock onClick={onClick}>
      {buttonName}
      <img src={DropdownIcon} alt={DropdownIcon} />
    </DropdownButtonBlock>
  );
};

export default DropdownButton;
