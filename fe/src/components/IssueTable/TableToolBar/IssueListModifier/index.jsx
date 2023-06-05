/* eslint-disable no-console */
import { useContext } from 'react';
import styled from 'styled-components';
import { RESET } from '../../../../constants';
import { setFilterOption } from '../../../../context/MainPage/MainPageActions';
import {
  MainPageFilterContext,
  MainPageFilterDispatchContext,
} from '../../../../context/MainPage/MainPageFilterContext';
import DropDown from '../../../DropDown';

const sendPatchRequest = async ({ targetIssueNumber, targetState }) => {
  const url = 'http://3.38.73.117:8080/api/issues';
  const body = {
    issueNumber: targetIssueNumber,
    state: targetState,
  };

  try {
    const response = await fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    const result = await response.json();
    console.log(`요청 성공: ${url}`, result);
  } catch (error) {
    console.error(`요청 실패: ${url}`, error);
  }
};

const changeIssuesState = async (selectedIssues, state) => {
  const requests = selectedIssues.map((number) => sendPatchRequest({
    targetIssueNumber: number,
    targetState: state,
  }));
  await Promise.all(requests);
};

const IssueListModifier = ({ selectedIssues, issueListTotalCount }) => {
  const filterOptions = useContext(MainPageFilterContext);
  const dispatch = useContext(MainPageFilterDispatchContext);

  const dropDownConfig = {
    buttonText: '상태 수정',
    headerText: '상태 변경',
    bodyItems: [
      {
        key: '선택한 이슈 열기',
        text: '선택한 이슈 열기',
        handleItemClick: async () => {
          await changeIssuesState(selectedIssues, true);
          dispatch(setFilterOption(RESET, filterOptions));
        },
      },
      {
        key: '선택한 이슈 닫기',
        text: '선택한 이슈 닫기',
        handleItemClick: async () => {
          await changeIssuesState(selectedIssues, false);
          dispatch(setFilterOption(RESET, filterOptions));
        },
      },
    ],
    bodyCheck: false,
    pos: 'right',
    marginTop: '10px',
  };

  return (
    <IssueListModifierBox>
      <span>
        {issueListTotalCount}
        개 이슈 선택
      </span>
      <div>
        <DropDown config={dropDownConfig} />
      </div>
    </IssueListModifierBox>
  );
};

export default IssueListModifier;

const IssueListModifierBox = styled.div`
  display: flex;
  align-items: center;
  width: 100%;

  > span {
    color: ${({ theme }) => theme.color.neutralTextWeak};
    font-weight: 700;
    font-size: 16px;
    flex-grow: 1;
  }

  > div {
    color: ${({ theme }) => theme.color.neutralTextWeak};
  }
`;
