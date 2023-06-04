import React, { useContext } from 'react';
import Inputs from './mainContentInputs/Inputs';
import Sidebar from './mainContentSidebar/Sidebar';
import { IssueFormInfoStateContext } from '@pages/IssueForm';
import { UserIcon, MainContentContainer } from './style';

/* TODO : 상태 관리 및 기능 구현 필요 */
/* TODO : post 요청 */

const IssueFormMainContent = () => {
  const { issueFormInfoState, dispatch } = useContext(IssueFormInfoStateContext);
  return (
    <MainContentContainer>
      <UserIcon />
      <Inputs />
      <Sidebar filterState={issueFormInfoState} dispatch={dispatch} />
    </MainContentContainer>
  );
};

export default IssueFormMainContent;
