import React, { useContext } from 'react';
import styled from 'styled-components';
import TextInputArea from './textInputArea';
import TitleInputArea from './titleInput';
import { IssueFormInfoStateContext } from '@pages/IssueForm';

const InputsBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 900px;
  height: 420px;
`;

const Inputs = () => {
  const { issueFormInfoState, dispatch } = useContext(IssueFormInfoStateContext);
  return (
    <InputsBox>
      <TitleInputArea issueFormInfoState={issueFormInfoState} dispatch={dispatch} />
      <TextInputArea issueFormInfoState={issueFormInfoState} dispatch={dispatch} />
    </InputsBox>
  );
};

export default Inputs;
