import React, { useState } from 'react';

import Tag from '@common/Tag';

import { IssueDetailData } from '@customTypes/IssueDetailPage';
import { getTimeElapsed } from '@utils/getTimeElapsed';
interface IssueMainInfoProps {
  issueDetailData: IssueDetailData;
  isIssueDetailTitleEdit: boolean;
}

const IssueMainInfo = (props: IssueMainInfoProps) => {
  const { issueDetailData, isIssueDetailTitleEdit } = props;
  const { issue, commentList } = issueDetailData;
  const time = issue.open ? issue.createdAt : issue.closedAt;
  const { days, hours, minutes } = getTimeElapsed(time);

  const [currentIssueTitle, setCurrentIssueTitle] = useState(issue.title);
  const handleChangeCurrentIssueTitle = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCurrentIssueTitle(e.target.value);
  };
  return (
    <div className="flex flex-col gap-y-5">
      {isIssueDetailTitleEdit ? (
        <div className="flex h-10 w-fit justify-start rounded-2xl bg-gray-200 px-6">
          <div className="flex w-[72px] items-center whitespace-nowrap text-sm">
            제목
          </div>
          <input
            type="text"
            value={currentIssueTitle}
            onChange={handleChangeCurrentIssueTitle}
            className="w-full bg-gray-200 text-2xl text-gray-900"
          />
        </div>
      ) : (
        <h1 className="flex h-10 items-center text-2xl text-gray-900">
          {issue.title}
          <span className="text-gray-600">#{issue.issueId}</span>
        </h1>
      )}
      <div className="flex items-center gap-2">
        <Tag tagType="openClose" isOpen={issue.open} />
        <span className="text-md text-gray-600">
          이 이슈가 {days}일 {hours}시간 {minutes}분 전에 {issue.userName}
          님에 의해 {issue.open ? '열렸습니다.' : '닫혔습니다.'} 코멘트 •{' '}
          {commentList.length + 1}개
        </span>
      </div>
    </div>
  );
};

export default IssueMainInfo;
