import { styled } from 'styled-components';
import search from '../assets/search.svg';

const StyledInput = styled.input`
  font-weight: 400;
  width: 40rem;
  height: 2.8rem;
  color: #6e7191;
  background-color: inherit;
  border: none;
`;

const StyledDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.8rem;

  background: #eff0f6;
  border-radius: 0px 11px 11px 0px;
  width: 47.2rem;
  padding: 0.6rem 2.4rem;
`;

const FilterInput = () => {
  return (
    <StyledDiv>
      <img src={search} alt="search" />
      <StyledInput />
    </StyledDiv>
  );
};

export default FilterInput;
