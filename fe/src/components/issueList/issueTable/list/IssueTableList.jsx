import React, { useContext } from 'react';
import styled from 'styled-components';
import IssueTableListItem from './listItems/IssueTableListItem';
import { IssueListStateContext } from '@pages/IssueList';
import { Link } from 'react-router-dom';

const IssueTableListBox = styled.ul`
  display: flex;
  flex-direction: column;
  border-radius: 16px;

  > a:last-child > li:not(:last-child) {
    border-bottom: 1px solid ${({ theme }) => theme.COLOR.GRAY300};
  }

  > a:last-child > li {
    border-radius: 0px 0px 16px 16px;
  }
`;

const IssueTableList = () => {
  const {
    issueListData: { issues },
  } = useContext(IssueListStateContext);

  return (
    <IssueTableListBox>
      {issues.map((issue) => (
        <Link to={`/issueDetail/${issue.id}`} key={issue.id}>
          <IssueTableListItem issue={issue}></IssueTableListItem>
        </Link>
      ))}
    </IssueTableListBox>
  );
};

export default IssueTableList;
