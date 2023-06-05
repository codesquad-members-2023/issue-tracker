import styled from 'styled-components';
import { useContext, useEffect, useState } from 'react';
import IssueItem from './IssueItem';
import TableToolBar from './TableToolBar';
import { GhostButton } from '../common';
import { OPENED, RESET } from '../../constants';
import { ReactComponent as xSquare } from '../../assets/xSquare.svg';
import { setFilterOption } from '../../context/MainPage/MainPageActions';
import { CheckBoxActive, CheckBoxDisabled, CheckBoxInitial } from './CheckBox';
import IssueListFilters from './TableToolBar/IssueListFilters';
import IssueListModifier from './TableToolBar/IssueListModifier';
import Pagination from './Pagination';
import { MainPageStateContext } from '../../context/MainPage/MainPageStateContext';
import {
  MainPageFilterContext,
  MainPageFilterDispatchContext,
  MainPageInitialFilterOptions,
} from '../../context/MainPage/MainPageFilterContext';

const IssueTable = () => {
  const { issues } = useContext(MainPageStateContext);
  const filterOptions = useContext(MainPageFilterContext);
  const dispatch = useContext(MainPageFilterDispatchContext);
  const [selectedIssues, setSelectedIssues] = useState([]);

  useEffect(() => {
    setSelectedIssues([]);
  }, [issues]);

  const addSelectedIssue = (issueNumber, checked) => {
    if (checked) {
      setSelectedIssues((prevSelectedIssues) => [
        ...prevSelectedIssues,
        issueNumber,
      ]);
    } else {
      setSelectedIssues((prevSelectedIssues) => {
        return prevSelectedIssues.filter((number) => number !== issueNumber);
      });
    }
  };

  const handleAllSelectedIssue = (checked) => {
    if (checked) {
      const allIssueNumbers = issues.map((issue) => issue.number);
      setSelectedIssues(allIssueNumbers);
    } else {
      setSelectedIssues([]);
    }
  };

  const isFilterApplied = Object.values(filterOptions).some(
    (option) => option !== null
      && option !== false
      && option.length > 0
      && option !== OPENED,
  );

  const filterNotice = isFilterApplied && (
    <FilterNoticeBox>
      <GhostButton
        size="S"
        gap="7px"
        color="neutralText"
        hoverColor="iconBackgoundBlue"
        onclick={() => {
          dispatch(setFilterOption(RESET, MainPageInitialFilterOptions));
        }}
      >
        <XSquare />
        현재의 검색 필터 및 정렬 지우기
      </GhostButton>
    </FilterNoticeBox>
  );

  const toolbarContent = selectedIssues.length ? (
    <IssueListModifier
      selectedIssues={selectedIssues}
      issueListTotalCount={selectedIssues.length}
    />
  ) : (
    <IssueListFilters />
  );

  const issueItems = issues
    && issues.length !== 0
    && issues
      .sort(
        (prevIssueInfo, nextIssueInfo) => new Date(nextIssueInfo.lastUpdatedDate)
          - new Date(prevIssueInfo.lastUpdatedDate),
      )
      .map((issue) => (
        <IssueItem
          key={issue.number}
          {...issue}
          handleCheckBoxClick={addSelectedIssue}
          isChecked={selectedIssues.includes(issue.number)}
        />
      ));

  const isAllSelected = selectedIssues.length === issues.length && selectedIssues.length;
  const isAnySelected = selectedIssues.length > 0;

  let CheckBox;

  if (isAllSelected) {
    CheckBox = (
      <CheckBoxActive
        handleCheckBoxClick={() => handleAllSelectedIssue(false)}
      />
    );
  } else if (isAnySelected) {
    CheckBox = (
      <CheckBoxDisabled
        handleCheckBoxClick={() => handleAllSelectedIssue(true)}
      />
    );
  } else {
    CheckBox = (
      <CheckBoxInitial
        handleCheckBoxClick={() => handleAllSelectedIssue(true)}
      />
    );
  }

  return (
    <div>
      {filterNotice}
      <TableToolBar>
        {CheckBox}
        {toolbarContent}
      </TableToolBar>
      {issueItems ? (
        <>
          <IssueItemList>{issueItems}</IssueItemList>
          <Pagination />
        </>
      ) : (
        <NoticeBox>검색과 일치하는 결과가 없습니다.</NoticeBox>
      )}
    </div>
  );
};

export default IssueTable;

const FilterNoticeBox = styled.div`
  height: 38px;
`;

const XSquare = styled(xSquare)`
  stroke: ${({ theme }) => theme.color.neutralText};
`;

const IssueItemList = styled.ul`
  display: flex;
  flex-direction: column;

  height: auto;
  border-radius: 0px 0px 16px 16px;

  > div {
    height: 100px;
    border-right: 1px solid ${({ theme }) => theme.color.neutralBorder};
    border-left: 1px solid ${({ theme }) => theme.color.neutralBorder};
    border-bottom: 1px solid ${({ theme }) => theme.color.neutralBorder};
  }

  > li:last-child {
    border-radius: 0px 0px 16px 16px;
  }
`;

const NoticeBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 100px;
  font-weight: ${({ theme }) => theme.fontWeight.regular};
  font-size: ${({ theme }) => theme.fontSize.M.size};
  color: ${({ theme }) => theme.color.neutralTextWeak};
  background-color: ${({ theme }) => theme.color.neutralBackgroundStrong};
  border-right: 1px solid ${({ theme }) => theme.color.neutralBorder};
  border-left: 1px solid ${({ theme }) => theme.color.neutralBorder};
  border-bottom: 1px solid ${({ theme }) => theme.color.neutralBorder};
  border-radius: 0px 0px 16px 16px;
`;
