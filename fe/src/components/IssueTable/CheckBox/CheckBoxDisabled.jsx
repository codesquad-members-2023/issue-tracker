import styled from 'styled-components';
import { ReactComponent as CheckBoxDisabledIcon } from '../../../assets/checkBoxDisabled.svg';

export const CheckBoxDisabled = ({ handleCheckBoxClick }) => {
  return (
    <CheckBoxDisabledBox onClick={handleCheckBoxClick}>
      <CheckBoxDisabledIcon />
    </CheckBoxDisabledBox>
  );
};

const CheckBoxDisabledBox = styled.button`
  cursor: pointer;
`;
