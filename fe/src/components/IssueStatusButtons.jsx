import styled from 'styled-components';
import alertCircle from '../assets/alertCircle.svg';
import archive from '../assets/archive.svg';

const IssueStatusButton = styled.a`
  width: 82px;
  height: 28px;
`;

const IssueStatusButtons = ({ props }) => {
  const { openedIssueCount, closedIssueCount } = props;

  return (
    <div>
      <IssueStatusButton>
        <img src={alertCircle} alt="Logo" />
        열린이슈(
        {openedIssueCount}
        )
      </IssueStatusButton>
      <IssueStatusButton>
        <img src={archive} alt="Logo" />
        닫힌이슈(
        {closedIssueCount}
        )
      </IssueStatusButton>
    </div>
  );
};

export default IssueStatusButtons;
