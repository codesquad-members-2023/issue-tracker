import React, { createContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import IssueMainInfo from '@components/IssueMainInfo/IssueMainInfo';
import IssueController from '@components/IssueController/IssueController';
import IssueCommentList from '@components/IssueCommentList/IssueCommentList';
import IssueCommentInput from '@components/IssueCommentInput/IssueCommentInput';
import IssueSubInfo from '@components/IssueSubInfo/IssueSubInfo';
import Button from '@common/Button';
import { IssueDetailData } from '@customTypes/IssueDetailPage';
import { BASE_API } from '../api';
import fetchData from '@utils/fetchSetData';

export const issueDetailDataContext = createContext<
  IssueDetailData | undefined
>(undefined);

const IssueDetailPage = () => {
  const { issueId } = useParams<{ issueId: string }>();
  const ISSUE_DETAIL_API = `${BASE_API}issues/${issueId}`;
  const [issueDetailData, setIssueDetailData] = useState<IssueDetailData>(); // [data, setData

  useEffect(() => {
    fetchData(ISSUE_DETAIL_API, setIssueDetailData);
  }, []);
  const [isIssueTitleEdit, setIsIssueTitleEdit] = useState(false);
  const handleClickIsIssueTitleEdit = () => {
    setIsIssueTitleEdit(!isIssueTitleEdit);
  };
  const navigate = useNavigate();
  return (
    <issueDetailDataContext.Provider value={issueDetailData}>
      <section>
        <section className="flex justify-between">
          {issueDetailData && (
            <IssueMainInfo
              issueDetailData={issueDetailData}
              isIssueDetailTitleEdit={isIssueTitleEdit}
            />
          )}
          <IssueController
            isIssueTitleEdit={isIssueTitleEdit}
            handleClickIsIssueTitleEdit={handleClickIsIssueTitleEdit}
          />
        </section>
        <div className="mt-6 h-6 border-t border-t-gray-300" />
        <section className="flex h-fit justify-start gap-x-8">
          <section className="flex h-fit w-4/5 flex-col justify-between gap-y-6">
            {issueDetailData && (
              <IssueCommentList
                comments={issueDetailData.commentList}
                issue={issueDetailData.issue}
              />
            )}
            <IssueCommentInput setIssueDetailData={setIssueDetailData} />
          </section>
          <section className="h-fit">
            {issueDetailData && (
              <IssueSubInfo
                issue={issueDetailData.issue}
                attachedLabels={issueDetailData.attachedLabelList}
                attachedMilestone={issueDetailData.attachedMilestone}
              />
            )}
            <div className="flex justify-end pr-8">
              <Button
                title="이슈 삭제"
                onClick={async () => {
                  if (!confirm('이슈를 삭제하시겠습니까?')) return;
                  await fetch(ISSUE_DETAIL_API, {
                    method: 'DELETE',
                  });
                  // NOTE(Jayden): navigate로 메인페이지로 이동하는데 왜 렌더링이 되는지 확인하기
                  navigate('/');
                }}
                type="Ghost"
                isFlexible={true}
                iconName="trash"
                fontSize="text-sm"
                color="Red"
              />
            </div>
          </section>
        </section>
      </section>
    </issueDetailDataContext.Provider>
  );
};

export default IssueDetailPage;
