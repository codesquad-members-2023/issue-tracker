import styled from 'styled-components';
import { ReactComponent as alertCircle } from '../../../../assets/alertCircle.svg';
import { ReactComponent as archive } from '../../../../assets/archive.svg';
import { Button } from '../../../common';
import { CLOSED, OPENED } from '../../../../constants';

const IssueStatusButtons = ({
  openedIssuesCount,
  closedIssuesCount,
  issueState,
  setFilterOptions,
}) => {
  const isOpened = issueState === OPENED;

  const handleOpenedIssueButton = () => {
    const newState = isOpened ? CLOSED : OPENED;
    setFilterOptions((prevState) => {
      return {
        ...prevState,
        state: newState,
      };
    });
  };

  const handleClosedIssueButton = () => {
    const newState = isOpened ? CLOSED : OPENED;
    setFilterOptions((prevState) => ({
      ...prevState,
      state: newState,
    }));
  };

  return (
    <IssueStatusButtonsBox>
      <Button
        buttonStatus={isOpened}
        handleButton={handleOpenedIssueButton}
        buttonText="열린이슈"
        count={openedIssuesCount}
        gap="10px"
        fontWeight={isOpened ? 'bold' : 'regular'}
        fontSize="M"
        color={isOpened ? 'neutralTextStrong' : 'neutralText'}
      >
        <AlertCircleIcon $isopen={isOpened} />
      </Button>
      <Button
        buttonText="닫힌이슈"
        handleButton={handleClosedIssueButton}
        count={closedIssuesCount}
        buttonStatus={!isOpened}
        gap="10px"
        fontWeight={!isOpened ? 'bold' : 'regular'}
        fontSize="M"
        color={!isOpened ? 'neutralTextStrong' : 'neutralText'}
      >
        <ArchiveIcon $isopen={isOpened} />
      </Button>
    </IssueStatusButtonsBox>
  );
};

export default IssueStatusButtons;

const IssueStatusButtonsBox = styled.div`
  display: flex;
  gap: 24px;
  flex-grow: 1;
`;

const AlertCircleIcon = styled(alertCircle)`
  stroke: ${({ theme, $isopen }) => ($isopen ? theme.color.iconBackgoundBlue : theme.color.neutralText)};
`;

const ArchiveIcon = styled(archive)`
  stroke: ${({ theme, $isopen }) => (!$isopen ? theme.color.iconBackgoundBlue : theme.color.neutralText)};
`;
