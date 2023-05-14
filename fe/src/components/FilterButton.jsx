import { styled } from 'styled-components';
import { useEffect, useState } from 'react';
import chevronDown from '../assets/chevronDown.svg';
import DropDown from './DropDown';

const StyledSpan = styled.span`
  font-weight: 700;
  font-size: 1.6rem;
  line-height: 2.8;
  color: #6e7191;
`;

const FilterButton = ({ className, filterOptions }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.addEventListener('click', () => {});
  }, []);

  return (
    <button
      className={className}
      type="button"
      onClick={() => {
        setIsOpen(!isOpen);
      }}
    >
      <StyledSpan>필터</StyledSpan>
      <img src={chevronDown} alt="chevron down" />
      {isOpen && <DropDown />}
    </button>
  );
};

export default FilterButton;
