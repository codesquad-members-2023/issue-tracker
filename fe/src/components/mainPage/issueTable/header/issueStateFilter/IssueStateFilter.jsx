import React, { useContext } from 'react';
import styled from 'styled-components';
import Checkbox from '../../../../../components/common/checkbox/Checkbox';
import IssueStateButton from './IssueStateButton';
import OpenIssueStatusIcon from '../../../../../assets/icons/OpenIssueStatusIcon.svg';
import CloseIssueStatusIcon from '../../../../../assets/icons/CloseIssueStatusIcon.svg';
import { MainPageInfoContext } from '../../../../../pages/MainPage';

const IssueStateFilterBox = styled.div`
  display: flex;
  width: 300px;
  padding: 10px;
`;

const IssueStateButtonBox = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
  margin-left: 20px;
`;

const IssueStateFilter = () => {
  const {
    isIssueOpen,
    setIssueState,
    issuePageData: {
      count: { opened, closed },
      issues,
    },
  } = useContext(MainPageInfoContext);

  const openButtonHandler = () => {
    if (isIssueOpen) return;
    setIssueState((prevState) => !prevState);
  };

  const closeButtonHandler = () => {
    if (!isIssueOpen) return;
    setIssueState((prevState) => !prevState);
  };

  return (
    <IssueStateFilterBox>
      <Checkbox />
      <IssueStateButtonBox>
        <IssueStateButton
          imgSrc={OpenIssueStatusIcon}
          imgAlt={OpenIssueStatusIcon}
          buttonName="열린이슈"
          issuesCount={isIssueOpen ? issues.length : opened}
          issueState={isIssueOpen}
          onClick={openButtonHandler}
        />
        <IssueStateButton
          imgSrc={CloseIssueStatusIcon}
          imgAlt={CloseIssueStatusIcon}
          buttonName="닫힌이슈"
          issuesCount={isIssueOpen ? closed : issues.length}
          issueState={!isIssueOpen}
          onClick={closeButtonHandler}
        />
      </IssueStateButtonBox>
    </IssueStateFilterBox>
  );
};

export default IssueStateFilter;
