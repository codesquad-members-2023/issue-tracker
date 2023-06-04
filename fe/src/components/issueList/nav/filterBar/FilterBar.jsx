import React, { useContext } from 'react';
import styled from 'styled-components';
import DropdownIcon from '@assets/icons/DropdownIcon.svg';
import SearchIcon from '@assets/icons/SearchIcon.svg';
import { IssueListStateContext } from '@pages/IssueList';

const FilterBarContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 601px;
  height: 40px;
  border-radius: 11px;
  border-collapse: collapse;
`;

const FilterButton = styled.summary`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 128px;
  height: 40px;
  background-color: ${({ theme }) => theme.COLOR.GRAY100};
  color: ${({ theme }) => theme.COLOR.GRAY600};
  font-weight: 700;
  font-size: 16px;
  border-radius: 11px 0px 0px 11px;
  border: 1px solid ${({ theme }) => theme.COLOR.GRAY300};
`;

const FilterInputContentBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  width: 472px;
  height: 40px;
  background-color: ${({ theme }) => theme.COLOR.GRAY200};
  border-radius: 0px 11px 11px 0px;
  border: 1px solid ${({ theme }) => theme.COLOR.GRAY300};
`;

const FilterInput = styled.input`
  width: 400px;
  height: 28px;
  background-color: ${({ theme }) => theme.COLOR.GRAY200};
  color: ${({ theme }) => theme.COLOR.GRAY600};
  border: none;
  outline: none;
`;

const FilterBar = () => {
  const { issueListStateText } = useContext(IssueListStateContext);
  return (
    <FilterBarContainer>
      <FilterButton>
        필터
        <img src={DropdownIcon} />
      </FilterButton>
      <FilterInputContentBox>
        <img src={SearchIcon} alt={SearchIcon} />
        <FilterInput type="text" value={issueListStateText} readOnly />
      </FilterInputContentBox>
    </FilterBarContainer>
  );
};

export default FilterBar;
