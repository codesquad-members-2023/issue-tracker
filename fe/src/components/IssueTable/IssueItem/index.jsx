import styled from 'styled-components';
import React from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as alertCircle } from '../../../assets/alertCircle.svg';
import { ReactComponent as mileStone } from '../../../assets/mileStone.svg';
import { ReactComponent as archive } from '../../../assets/archive.svg';
import { Label, UserIcon } from '../../common';
import { CheckBoxActive, CheckBoxInitial } from '../CheckBox';
import { getElapsedTime } from '../../../utils';

const IssueItem = ({
  state,
  number,
  title,
  createdDate,
  labels,
  milestone,
  user,
  handleCheckBoxClick,
  isChecked,
}) => {
  const CheckBox = isChecked ? (
    <CheckBoxActive
      handleCheckBoxClick={() => handleCheckBoxClick(number, false)}
    />
  ) : (
    <CheckBoxInitial
      handleCheckBoxClick={() => handleCheckBoxClick(number, true)}
    />
  );

  return (
    <IssueItemBox>
      {CheckBox}
      <IssueItemBody>
        <IssueItemTitle>
          {state ? <AlertCircleIcon /> : <Archive />}
          <IssueItemLink to={`/issue-detail/${number}`}>
            <p>{title}</p>
          </IssueItemLink>
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
            {`이 이슈가 ${getElapsedTime(createdDate)}, ${
              user.nickname
            }에 의해 작성되었습니다.`}
          </span>
          {milestone && (
            <span>
              <MileStoneIcon />
              {milestone.name}
            </span>
          )}
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
  border-right: 1px solid ${({ theme }) => theme.color.neutralBorder};
  border-left: 1px solid ${({ theme }) => theme.color.neutralBorder};
  border-bottom: 1px solid ${({ theme }) => theme.color.neutralBorder};
  background-color: ${({ theme }) => theme.color.neutralBackgroundStrong};

  &:hover {
    background-color: ${({ theme }) => theme.color.neutralBackground};
  }

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

const IssueItemLink = styled(Link)`
  &:hover {
    color: ${({ theme }) => theme.color.iconBackgoundBlue};
  }
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
