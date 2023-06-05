import styled from 'styled-components';
import { useContext } from 'react';
import { ReactComponent as alertCircle } from '../../../../../assets/alertCircle.svg';
import { ReactComponent as archive } from '../../../../../assets/archive.svg';
import { GhostButton } from '../../../../common';
import { CLOSED, ISSUE_STATE, OPENED } from '../../../../../constants';
import { setFilterOption } from '../../../../../context/MainPage/MainPageActions';
import { MainPageStateContext } from '../../../../../context/MainPage/MainPageStateContext';
import {
  MainPageFilterContext,
  MainPageFilterDispatchContext,
} from '../../../../../context/MainPage/MainPageFilterContext';

const IssueStatusButtons = () => {
  const {
    counts: { openedIssuesCount, closedIssuesCount },
  } = useContext(MainPageStateContext);
  const { issueState } = useContext(MainPageFilterContext);
  const dispatch = useContext(MainPageFilterDispatchContext);

  const isOpened = issueState !== CLOSED;

  return (
    <IssueStatusButtonsBox>
      <GhostButton
        color={isOpened ? 'neutralTextStrong' : 'neutralText'}
        hoverColor={isOpened ? 'neutralText' : 'neutralTextStrong'}
        onclick={() => {
          dispatch(setFilterOption(ISSUE_STATE, OPENED));
        }}
      >
        <AlertCircleIcon $isopen={isOpened} />
        열린이슈 (
        {openedIssuesCount}
        )
      </GhostButton>
      <GhostButton
        color={!isOpened ? 'neutralTextStrong' : 'neutralText'}
        hoverColor={isOpened ? 'neutralTextStrong' : 'neutralText'}
        onclick={() => {
          dispatch(setFilterOption(ISSUE_STATE, CLOSED));
        }}
      >
        <ArchiveIcon $isopen={isOpened} />
        닫힌이슈 (
        {closedIssuesCount}
        )
      </GhostButton>
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
