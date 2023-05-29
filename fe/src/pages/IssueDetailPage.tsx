import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import IssueMainInfo from '@components/IssueMainInfo/IssueMainInfo';
import IssueController from '@components/IssueController/IssueController';
import IssueCommentList from '@components/IssueCommentList/IssueCommentList';
import IssueCommentInput from '@components/IssueCommentInput/IssueCommentInput';
import IssueSubInfo from '@components/IssueSubInfo/IssueSubInfo';
import Button from '@common/Button';
import { IssueDetailData } from '@customTypes/IssueDetailPage';
import { BASE_API } from '../api';

const IssueDetailPage = () => {
  const { issueId } = useParams<{ issueId: string }>();
  const ISSUE_DETAIL_API = `${BASE_API}issues/${issueId}`;

  const [issueDetailData, setIssueDetailData] = useState<IssueDetailData>(); // [data, setData
  const fetchData = async (api: string) => {
    try {
      const res = await fetch(api);
      const data = await res.json();
      setIssueDetailData(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData(ISSUE_DETAIL_API);
  }, []);

  const [isIssueTitleEdit, setIsIssueTitleEdit] = useState(false);
  const handleClickIsIssueTitleEdit = () => {
    setIsIssueTitleEdit(!isIssueTitleEdit);
  };
  const issueDetailWrapperRef = React.useRef<HTMLTextAreaElement>(null);
  return (
    <section ref={issueDetailWrapperRef}>
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
          <IssueCommentInput />
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
              onClick={() => {
                console.log('이슈 삭제');
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
  );
};

export default IssueDetailPage;
