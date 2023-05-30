// TODO: Lint 속성 점검 필요
/* eslint-disable camelcase */
import styled from 'styled-components';
import React from 'react';
import CheckBox from '../CheckBox/CheckBox';
import { ReactComponent as alertCircle } from '../../../assets/alertCircle.svg';
import { ReactComponent as mileStone } from '../../../assets/mileStone.svg';
import { ReactComponent as archive } from '../../../assets/archive.svg';
import { Label, UserIcon } from '../../common';

// TODO(덴): 방어로직 구현 필요
const IssueItem = ({
  state,
  number,
  title,
  createdDate,
  lastUpdatedDate,
  labels,
  milestone,
  user,
}) => {
  const getTimeDifference = () => {
    const currentTime = new Date();
    const issueTime = new Date(lastUpdatedDate || createdDate);
    const timeDifference = Math.floor((currentTime - issueTime) / (1000 * 60));
    return timeDifference;
  };

  const getTimeAgoString = () => {
    const timeDifference = getTimeDifference();
    if (timeDifference < 1) return '방금 전';
    if (timeDifference < 60) return `${timeDifference}분 전`;
    if (timeDifference < 1440) return `${Math.floor(timeDifference / 60)}시간 전`;
    return `${Math.floor(timeDifference / 1440)}일 전`;
  };

  return (
    <IssueItemBox>
      <CheckBox />
      <IssueItemBody>
        <IssueItemTitle>
          {state ? <AlertCircleIcon /> : <Archive />}
          <p>{title}</p>
          {labels.map((labelInfo) => (
            <Label key={labelInfo.name} {...labelInfo} />
          ))}
        </IssueItemTitle>
        <IssueItemAttributes>
          <span>
            #
            {number}
          </span>
          <span>
            {`이 이슈가 ${getTimeAgoString()}, ${
              user.nickname
            }에 의해 작성되었습니다.`}
          </span>
          <span>
            <MileStoneIcon />
            {milestone?.name}
          </span>
        </IssueItemAttributes>
      </IssueItemBody>
      <div>
        <UserIcon imgSrc={user.imgUrl} />
      </div>
    </IssueItemBox>
  );
};

export default IssueItem;

const IssueItemBox = styled.li`
  display: flex;
  align-items: center;
  flex-direction: row;

  padding: 24px;
  background: ${({ theme }) => theme.color.neutralBackgroundStrong};

  > div {
    padding: 0 33px;
  }
`;

const IssueItemBody = styled.div`
  display: flex;
  flex-direction: column;

  gap: 8px;
  flex-grow: 1;
`;

const IssueItemTitle = styled.div`
  display: flex;
  align-items: center;

  font-size: ${({ theme }) => theme.fontSize.L.size};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.color.neutralTextStrong};
  gap: 10px;
  flex-direction: row;
`;

const IssueItemAttributes = styled.div`
  display: flex;
  flex-direction: row;
  gap: 16px;

  font-size: ${({ theme }) => theme.fontSize.M.size};
  font-weight: ${({ theme }) => theme.fontWeight.regular};
  color: ${({ theme }) => theme.color.neutralTextWeak};

  > span {
    display: flex;
    gap: 8px;
  }
`;

const AlertCircleIcon = styled(alertCircle)`
  stroke: ${({ theme }) => theme.color.iconBackgoundBlue};
`;

const Archive = styled(archive)`
  stroke: ${({ theme }) => theme.color.iconBackgoundBlue};
`;

const MileStoneIcon = styled(mileStone)`
  fill: ${({ theme }) => theme.color.neutralText};
`;
