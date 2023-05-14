import { styled } from 'styled-components';
import FilterInput from './FilterInput';
import FilterButton from './FilterButton';

const StyledDiv = styled.div`
  display: flex;

  border: 1px solid #d9dbe9;
  border-radius: 11px;
  width: 60rem;
  position: relative;
`;

const StyledFilterButton = styled(FilterButton)`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.8rem;

  width: 12.8rem;
  height: 4rem;
  background: #f7f7fc;
  border-radius: 11px 0px 0px 11px;
`;

const FilterBar = ({ filterOptions }) => {
  return (
    <StyledDiv>
      <StyledFilterButton filterOptions={filterOptions} />
      <FilterInput />
    </StyledDiv>
  );
};
export default FilterBar;
