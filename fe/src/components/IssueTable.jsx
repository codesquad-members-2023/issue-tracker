import styled from 'styled-components';
import CheckBox from './CheckBox';
import IssueList from './IssueList';
import IssueStatusButtons from './IssueStatusButtons';
import TableToolBar from './TableToolBar';

const IssueTableContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1px;

  position: absolute;
  width: 1280px;
  height: 266px;
  left: 80px;
  top: 190px;
`;

const IssueTable = (props) => (
  <IssueTableContainer>
    <TableToolBar>
      <CheckBox />
      <IssueStatusButtons props={props} />
    </TableToolBar>
    <IssueList />
  </IssueTableContainer>
);

export default IssueTable;
