import styled from 'styled-components';
import { ReactComponent as CheckBoxInitialIcon } from '../../../assets/checkBoxInitial.svg';

export const CheckBoxInitial = ({ handleCheckBoxClick }) => {
  return (
    <CheckBoxInitialBox onClick={handleCheckBoxClick}>
      <CheckBoxInitialIcon />
    </CheckBoxInitialBox>
  );
};

const CheckBoxInitialBox = styled.button`
  cursor: pointer;
`;
