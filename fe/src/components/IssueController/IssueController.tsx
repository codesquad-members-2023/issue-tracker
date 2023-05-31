import React, { useContext } from 'react';

import Button from '@common/Button';
import { issueDetailDataContext } from '../../pages/IssueDetailPage';

interface IssueControllerProps {
  isIssueTitleEdit: boolean;
  handleClickIsIssueTitleEdit: () => void;
}

const IssueController = (props: IssueControllerProps) => {
  // TODO(Jayden): 각 버튼마다 fetch 함수 연결 혹은 link 연결
  const { isIssueTitleEdit, handleClickIsIssueTitleEdit } = props;
  const issueDetailData = useContext(issueDetailDataContext);
  return (
    <div className="flex gap-x-2">
      {isIssueTitleEdit ? (
        <>
          <Button
            title="편집 취소"
            onClick={handleClickIsIssueTitleEdit}
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
              console.log('fetch(PATCH)');
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
