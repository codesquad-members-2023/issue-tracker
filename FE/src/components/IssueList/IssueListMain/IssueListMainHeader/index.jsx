import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { useCheckBoxContext } from '../../../../context/checkBoxContext';

import { FILTER_TYPE, FILTER_NAME } from '../../../../constants/dropdownMenu';

import Button from '../../../common/Button';
import Icon from '../../../common/Icon';
import DropDown from '../../../common/DropDown';
import {
  $IssueListMainHeader,
  $CheckBox,
  $IssueStateControls,
  $IssueButtonsWrapper,
  $FilterOptions,
  $CheckStatus,
  $StatusChangeButton,
} from './style';
import useFetch from '../../../../hooks/useFetch';
import { ISSUES } from '../../../../constants/api';

const IssueListMainHeader = ({
  openCount,
  closeCount,
  user,
  label,
  milestone,
  openBtnHandler,
  closeBtnHandler,
  isOpened,
  filteredIssuesIds,
  getNewAllIssueData,
}) => {
  // const {fetchData: editIssueStatus } = useFetch(ISSUES.PATCH_ISSUE(user))
  const { resetCheckList, allCheck, checkList } = useCheckBoxContext();
  const isSelected = checkList.length !== 0;
  const fetchList = [];

  const checkBoxClickHandler = () => {
    isSelected ? resetCheckList() : allCheck(filteredIssuesIds);
  };

  checkList.forEach((checkIssue) => {
    fetchList.push(ISSUES.GET_ISSUE(checkIssue));
  });

  const { fetchData: editIssueStatus } = useFetch(
    fetchList,
    'PATCH',
    {
      isopened: !isOpened,
    },
    true,
  );

  const statusChangeHandler = async () => {
    await editIssueStatus();
    getNewAllIssueData();
    resetCheckList();
  };

  const openIssueButton = (
    <Button type="ghost" size="M" active={isOpened} onClick={openBtnHandler}>
      <Icon name="alertCircle" />
      <p>{`열린 이슈(${openCount})`}</p>
    </Button>
  );
  const closeIssueButton = (
    <Button type="ghost" size="M" active={!isOpened} onClick={closeBtnHandler}>
      <Icon name="trash" />
      <p>{`닫힌 이슈(${closeCount})`}</p>
    </Button>
  );
  const statusChangeButton = (
    <$StatusChangeButton type="ghost" size="M" onClick={statusChangeHandler} open={isOpened}>
      <Icon name={isOpened ? 'archive' : 'alertCircle'} fill={isOpened ? '#FF3B30' : '#007AFF'} />
      <p>{`선택된 이슈 ${isOpened ? 'Close' : 'Open'}`}</p>
    </$StatusChangeButton>
  );

  return (
    <$IssueListMainHeader>
      <$IssueStateControls>
        <$CheckBox type="button" onClick={checkBoxClickHandler}>
          <Icon
            name={isSelected ? 'checkBoxDisable' : 'checkBoxInitial'}
            fill={isSelected ? '#007AFF' : '#D9DBE9'}
          />
        </$CheckBox>
        {checkList.length !== 0 ? (
          <$CheckStatus>{`${checkList.length}개 이슈 선택`}</$CheckStatus>
        ) : (
          <$IssueButtonsWrapper>
            {openIssueButton}
            {closeIssueButton}
          </$IssueButtonsWrapper>
        )}
      </$IssueStateControls>
      <$FilterOptions>
        {checkList.length !== 0 ? (
          statusChangeButton
        ) : (
          <React.Fragment>
            <DropDown type={FILTER_TYPE.ASSIGNEE} name={FILTER_NAME.ASSIGNEE} menus={user} position="right" />
            <DropDown type={FILTER_TYPE.LABEL} name={FILTER_NAME.LABEL} menus={label} position="right" />
            <DropDown
              type={FILTER_TYPE.MILESTONE}
              name={FILTER_NAME.MILESTONE}
              menus={milestone}
              position="right"
            />
            <DropDown type={FILTER_TYPE.WRITER} name={FILTER_NAME.WRITER} menus={user} position="right" />
          </React.Fragment>
        )}
        {/* { TODO: 조건부 렌더링으로 헤더부분 갈아끼워야함 } */}
      </$FilterOptions>
    </$IssueListMainHeader>
  );
};

IssueListMainHeader.propTypes = {
  openCount: PropTypes.number,
  closeCount: PropTypes.number,
  user: PropTypes.array.isRequired,
  label: PropTypes.array.isRequired,
  milestone: PropTypes.array.isRequired,
  openBtnHandler: PropTypes.func.isRequired,
  closeBtnHandler: PropTypes.func.isRequired,
  isOpened: PropTypes.bool.isRequired,
  filteredIssuesIds: PropTypes.array.isRequired,
  getNewAllIssueData: PropTypes.func.isRequired,
};

export default IssueListMainHeader;
