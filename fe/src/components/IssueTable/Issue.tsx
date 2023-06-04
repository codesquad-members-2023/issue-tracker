import React from 'react';
import { Link } from 'react-router-dom';

import Profile from '@common/Profile';
import Label from '@common/Label';
import { LabelRow } from './IssueTable';
import { ElapseTime } from '@utils/getTimeElapsed';
import { ReactComponent as AlertCircle } from '@assets/alertCircle.svg';
import { ReactComponent as Archive } from '@assets/archive.svg';
import { ReactComponent as Milestone } from '@assets/milestone.svg';

interface Props {
  issueId: number;
  title: string;
  userName: string;
  profileUrl: string;
  isOpen: boolean;
  labelList: LabelRow[];
  elapseTime: ElapseTime;
  milestoneName?: string;
  isChecked: boolean;
  onIssueChecked: (id: number) => void;
  onIssueTitleClick: (id: number) => void;
}

const Issue: React.FC<Props> = ({
  issueId,
  title,
  userName,
  profileUrl,
  isOpen,
  elapseTime,
  milestoneName,
  labelList,
  isChecked,
  onIssueChecked,
  onIssueTitleClick,
}) => {
  const { days, hours, minutes } = elapseTime;
  const elapsedMessage = isOpen
    ? `${days !== 0 ? `${days}일 ` : ''}${hours !== 0 ? `${hours}시간 ` : ''}${
        minutes !== 0 ? `${minutes}분 ` : ''
      }전, ${userName}님에 의해 작성되었습니다.`
    : `${days !== 0 ? `${days}일 ` : ''}${
        hours !== 0 ? `${hours}시간 ` : ''
      } ${minutes}분 전, ${userName}님에 의해 닫혔습니다.`;

  return (
    <div className="flex border-t border-gray-300 px-8 py-4 hover:bg-gray-100">
      <div className="mr-8 mt-1">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={() => onIssueChecked(issueId)}
        />
      </div>
      <div>
        <div className="mb-1 flex items-center">
          {isOpen ? (
            <AlertCircle stroke="#007AFF" />
          ) : (
            <Archive stroke="#4E4B66" />
          )}
          <Link
            to={`issues/${issueId}`}
            className="mx-2 text-left text-lg font-bold text-gray-900"
            onChange={() => onIssueTitleClick(issueId)}
          >
            {title}
          </Link>
          <div className="flex">
            {labelList.map(label => {
              const { labelId, labelName, backgroundColor, fontColor } = label;
              return (
                <Label
                  key={labelId}
                  labelName={labelName}
                  backgroundColor={backgroundColor}
                  fontColor={fontColor}
                />
              );
            })}
          </div>
        </div>
        <div className="flex">
          <span className="mr-4 text-gray-600">#{issueId}</span>
          <span className="mr-4 text-gray-600">{elapsedMessage}</span>
          {milestoneName && (
            <div className="flex items-center">
              <Milestone fill="#6E7191" />
              <span className="ml-2 text-gray-600">{milestoneName}</span>
            </div>
          )}
        </div>
      </div>
      <div className="flex grow items-center justify-end">
        <Profile url={profileUrl} width={20} height={20} />
      </div>
    </div>
  );
};

export default Issue;
