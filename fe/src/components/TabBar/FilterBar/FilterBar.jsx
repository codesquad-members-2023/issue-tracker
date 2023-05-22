import { styled } from 'styled-components';
import FilterInput from './FilterInput/FilterInput';
import DropDown from '../../DropDown/DropDown';

const FilterBar = ({ filterOptions, setFilterOptions }) => {
  const dropDownConfig = {
    buttonText: '필터',
    headerText: '이슈 필터',
    bodyItems: [
      {
        text: '열린 이슈',
        checked: filterOptions.state === 'opened',
        onClick: () => setFilterOptions({ ...filterOptions, state: 'opened' }),
      },
      {
        text: '닫힌 이슈',
        checked: filterOptions.state === 'closed',
        onClick: () => setFilterOptions({ ...filterOptions, state: 'closed' }),
      },
    ],
    bodyCheck: true,
    marginTop: '10px',
  };

  return (
    <FilterBarBox>
      <FilterBarDropDown config={dropDownConfig} />
      <FilterInput filterOptions={filterOptions} />
    </FilterBarBox>
  );
};
export default FilterBar;

const FilterBarBox = styled.div`
  display: flex;

  border: 1px solid ${({ theme }) => theme.color.neutralBorder};
  border-radius: 11px;
  width: 600px;
  position: relative;
  height: 40px;
  color: ${({ theme }) => theme.color.neutralTextWeak};
`;

const FilterBarDropDown = styled(DropDown)`
  padding: 4px 24px;
  border-radius: 11px 0px 0px 11px;
`;
