import React, { useReducer, createContext } from 'react';
import styled from 'styled-components';
import IssueFormMainContent from '@components/issueForm/issueFormMainContent';
import PageLayout from '@components/common/layout/PageLayout';
import Buttons from '@components/issueForm/issueFormButtons/Buttons';
import apiUrl from '@utils/api/api';

export const IssueFormInfoStateContext = createContext();

const initialState = {
  writerId: 4, // 로그인 기능이 없어 작성자 id 고정
  title: '',
  description: '',
  fileUrl: '',
  assignees: null,
  labels: null,
  milestones: null,
};

const issueFormReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'SET_TITLE':
      return {
        ...state,
        title: payload,
      };
    case 'SET_DESCRIPTION':
      return {
        ...state,
        description: payload,
      };
    case 'SET_SIDEBAR_INFO':
      return state[payload.key] === payload.value
        ? { ...state, [payload.key]: null }
        : { ...state, [payload.key]: payload.value };
    default:
      return state;
  }
};

const IssueForm = () => {
  const [issueFormInfoState, dispatch] = useReducer(issueFormReducer, initialState);
  const generatePostData = (issueFormInfoState) => {
    const { writerId, title, description, fileUrl, assignees, labels, milestones } =
      issueFormInfoState;

    const postData = {
      writerId,
      title,
      description,
      fileUrl: fileUrl ? fileUrl : null,
      assigneeIds: assignees ? [assignees] : [],
      labelIds: labels ? [labels] : [],
      milestoneId: milestones,
    };

    return JSON.stringify(postData);
  };

  const postData = async (issueFormInfoState) => {
    const postData = generatePostData(issueFormInfoState);

    try {
      const response = await fetch(`${apiUrl}/issues`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: postData,
      });

      if (!response.ok) {
        throw new Error('Failed to post data');
      }

      const responseData = await response.json();
      console.log(responseData);
    } catch (error) {
      console.error(error);
    }
  };

  const submitButtonClickHandler = () => {
    postData(issueFormInfoState);
  };

  return (
    <PageLayout>
      <IssueFormInfoStateContext.Provider
        value={{ issueFormInfoState, dispatch, submitButtonClickHandler }}
      >
        <IssueFormTitle>새로운 이슈 작성</IssueFormTitle>
        <DividingLine />
        <IssueFormMainContent />
        <DividingLine />
        <Buttons />
      </IssueFormInfoStateContext.Provider>
    </PageLayout>
  );
};

const IssueFormTitle = styled.div`
  font-size: ${({ theme }) => theme.FONT_SIZE.XXL}px;
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.REGULAR};
  line-height: 48px;
`;

const DividingLine = styled.div`
  height: 1px;
  background-color: ${({ theme }) => theme.COLOR.GRAY300};
  margin-top: 24px;
`;

export default IssueForm;
