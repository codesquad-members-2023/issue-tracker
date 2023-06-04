import React, { useContext } from 'react';
import styled from 'styled-components';
import Button from '@common/button/index';
import CancelIcon from '@assets/icons/CancelIcon.svg';
import { IssueFormInfoStateContext } from '@pages/IssueForm';
import { Link } from 'react-router-dom';

const ButtonsBox = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0px;
  gap: 32px;
  margin-top: 20px;
`;

const Buttons = () => {
  const {
    issueFormInfoState: { title },
    submitButtonClickHandler,
  } = useContext(IssueFormInfoStateContext);

  const submitButtonState = title.length > 0 ? 'default' : 'disabled';

  return (
    <ButtonsBox>
      <Link to="/">
        <Button title="작성취소" icon={CancelIcon} type="ghost" size="medium" />
      </Link>
      <Button
        title="완료"
        type="container"
        size="large"
        state={submitButtonState}
        onClick={submitButtonClickHandler}
      />
    </ButtonsBox>
  );
};

export default Buttons;
