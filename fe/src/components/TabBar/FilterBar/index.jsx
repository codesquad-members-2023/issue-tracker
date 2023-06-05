import { styled } from 'styled-components';
import { useContext } from 'react';
import FilterInput from './FilterInput';
import DropDown from '../../DropDown';
import { setFilterOption } from '../../../context/MainPage/MainPageActions';
import { CLOSED, ISSUE_STATE, OPENED } from '../../../constants';
import {
  MainPageFilterContext,
  MainPageFilterDispatchContext,
} from '../../../context/MainPage/MainPageFilterContext';

const FilterBar = () => {
  const filterOptions = useContext(MainPageFilterContext);
  const { issueState } = useContext(MainPageFilterContext);
  const dispatch = useContext(MainPageFilterDispatchContext);

  const dropDownConfig = {
    buttonText: '필터',
    headerText: '이슈 필터',
    bodyItems: [
      {
        text: '열린 이슈',
        checked: issueState === OPENED,
        handleItemClick: () => dispatch(setFilterOption(ISSUE_STATE, OPENED)),
      },
      {
        text: '닫힌 이슈',
        checked: issueState === CLOSED,
        handleItemClick: () => dispatch(setFilterOption(ISSUE_STATE, CLOSED)),
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
