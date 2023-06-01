import React from 'react';

import Button from '@common/Button';
import { BASE_API } from '../../api';
import { IssueDetailData } from '@customTypes/IssueDetailPage';
import fetchSetData from '@utils/fetchSetData';

interface IssueControllerProps {
  isIssueTitleEdit: boolean;
  handleClickIsIssueTitleEdit: () => void;
  currentIssueTitle: string;
  setCurrentIssueTitle: React.Dispatch<
    React.SetStateAction<string | undefined>
  >;
  issueId: string;
  issueDetailData: IssueDetailData;
  setIssueDetailData: React.Dispatch<
    React.SetStateAction<IssueDetailData | undefined>
  >;
}

const IssueController = (props: IssueControllerProps) => {
  // TODO(Jayden): 각 버튼마다 fetch 함수 연결 혹은 link 연결
  const {
    isIssueTitleEdit,
    handleClickIsIssueTitleEdit,
    issueId,
    currentIssueTitle,
    setCurrentIssueTitle,
    issueDetailData,
    setIssueDetailData,
  } = props;
  console.log('issueDetailData', issueDetailData);
  return (
    <div className="flex gap-x-2">
      {isIssueTitleEdit ? (
        <>
          <Button
            title="편집 취소"
            onClick={() => {
              handleClickIsIssueTitleEdit();
              setCurrentIssueTitle(issueDetailData?.issue.title as string);
            }}
            size="Small"
            type="Outline"
            iconName="edit"
            fontSize="text-sm"
          />
          <Button
            title="편집 완료"
            onClick={async () => {
              handleClickIsIssueTitleEdit();
              await fetch(`${BASE_API}issues/${issueId}/title`, {
                method: 'PATCH',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  title: currentIssueTitle,
                }),
              });
              await fetchSetData(
                `${BASE_API}issues/${issueId}`,
                setIssueDetailData
              );
            }}
            size="Small"
            type="Contained"
            iconName="edit"
            fontSize="text-sm"
          />
        </>
      ) : (
        <>
          <Button
            title="제목 편집"
            onClick={() => {
              handleClickIsIssueTitleEdit();
              fetch;
            }}
            size="Small"
            type="Outline"
            iconName="edit"
            fontSize="text-sm"
          />
          <Button
            title={issueDetailData.issue.open ? '이슈 닫기' : '다시 열기'}
            onClick={() => {
              if (
                confirm(
                  `이슈를 ${
                    issueDetailData.issue.open
                      ? '닫으시겠습니까?'
                      : '열으시겠습니까?'
                  }`
                )
              ) {
                fetch(`${BASE_API}issues/${issueId}`, {
                  method: 'PATCH',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    isOpen: !issueDetailData.issue.open,
                  }),
                });
              }
            }}
            size="Small"
            type="Outline"
            iconName="archive"
            fontSize="text-sm"
          />
        </>
      )}
    </div>
  );
};

export default IssueController;
