import styled from 'styled-components';
import { ReactComponent as CheckBoxActiveIcon } from '../../../assets/checkBoxActive.svg';

export const CheckBoxActive = ({ handleCheckBoxClick }) => {
  return (
    <CheckBoxActiveBox onClick={handleCheckBoxClick}>
      <CheckBoxActiveIcon />
    </CheckBoxActiveBox>
  );
};

const CheckBoxActiveBox = styled.button`
  cursor: pointer;
`;
