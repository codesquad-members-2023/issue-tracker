import React from 'react';
import styled from 'styled-components';
import Dropdown from '../../../../common/dropdown/Dropdown';
import apiUrl from '../../../../../utils/api/api';

const IssueFilterOptionsBox = styled.div`
  display: flex;
  justify-content: space-between;
  width: 400px;
  align-items: center;
`;

const IssueFilterOptions = () => {
  const fetchDropdownContent = async (buttonType) => {
    const response = await fetch(`${apiUrl}/${buttonType}`);
    const data = await response.json();

    return data;
  };

  const issueDropdownButtons = [
    { buttonName: '담당자', id: 'assignees', key: 'assignees' },
    { buttonName: '레이블', id: 'labels', key: 'labels' },
    { buttonName: '마일스톤', id: 'milestones?status=open', key: 'milestones' },
    { buttonName: '작성자', id: 'writers', key: 'writers' },
  ];
  return (
    <IssueFilterOptionsBox>
      {issueDropdownButtons.map((button) => (
        <Dropdown
          key={button.key}
          contentKey={button.key}
          title={button.buttonName}
          fetchDropdownContent={() => fetchDropdownContent(button.id)}
        />
      ))}
    </IssueFilterOptionsBox>
  );
};

export default IssueFilterOptions;
