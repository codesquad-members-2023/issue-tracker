import React from 'react';
import Tag from '@common/Tag';

import { IssueDetailData } from '@customTypes/IssueDetailPage';
import { getTimeElapsed } from '@utils/getTimeElapsed';
interface IssueMainInfoProps {
  issueDetailData: IssueDetailData;
}

const IssueMainInfo = (props: IssueMainInfoProps) => {
  const { issueDetailData } = props;
  const { issue, labelList } = issueDetailData;
  const time = issue.open ? issue.createdAt : issue.closedAt;
  const { days, hours, minutes } = getTimeElapsed(time);
  return (
    <div>
      <h1 className="text-2xl text-gray-900">
        {issue.title}
        <span className="text-gray-600">#{issue.issueId}</span>
      </h1>
      <div className="flex items-center gap-2">
        <Tag tagType="openClose" isOpen={issue.open} />
        <span className="text-md text-gray-600">
          이 이슈가 {days}일 {hours}시간 {minutes}분 전에 {issue.userName}
          님에 의해 {issue.open ? '열렸습니다.' : '닫혔습니다.'} 코멘트 •{' '}
          {labelList.length}개
        </span>
      </div>
    </div>
  );
};

export default IssueMainInfo;
