import React from 'react';

import Button from '@common/Button';
import { BASE_API } from '../../api';

interface IssueControllerProps {
  isIssueTitleEdit: boolean;
  handleClickIsIssueTitleEdit: () => void;
  currentIssueTitle: string;
  setCurrentIssueTitle: React.Dispatch<
    React.SetStateAction<string | undefined>
  >;
  issueId: string;
  initialIssueTitle: string;
}

const IssueController = (props: IssueControllerProps) => {
  // TODO(Jayden): 각 버튼마다 fetch 함수 연결 혹은 link 연결
  const {
    isIssueTitleEdit,
    handleClickIsIssueTitleEdit,
    issueId,
    currentIssueTitle,
    setCurrentIssueTitle,
    initialIssueTitle,
  } = props;
  return (
    <div className="flex gap-x-2">
      {isIssueTitleEdit ? (
        <>
          <Button
            title="편집 취소"
            onClick={() => {
              handleClickIsIssueTitleEdit();
              setCurrentIssueTitle(initialIssueTitle);
            }}
            size="Small"
            type="Outline"
            iconName="edit"
            fontSize="text-sm"
          />
          <Button
            title="편집 완료"
            onClick={() => {
              handleClickIsIssueTitleEdit();
              // TODO(Jayden): fetch(PATCH) 요청 처리
              fetch(`${BASE_API}issues/${issueId}/title`, {
                method: 'PATCH',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  title: currentIssueTitle,
                }),
              });
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
            title="이슈 닫기"
            onClick={() => console.log('이슈 닫기')}
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
