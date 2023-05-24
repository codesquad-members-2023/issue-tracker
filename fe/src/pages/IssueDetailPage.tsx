import React, { useEffect, useState } from 'react';

import IssueMainInfo from '@components/IssueMainInfo/IssueMainInfo';
import IssueController from '@components/IssueController/IssueController';
import IssueCommentList from '@components/IssueCommentList/IssueCommentList';
import IssueCommentInput from '@components/IssueCommentInput/IssueCommentInput';
import IssueSubInfo from '@components/IssueSubInfo/IssueSubInfo';
import Button from '@common/Button';
import { IssueDetailData } from '@customTypes/IssueDetailPage';

// TODO(Jayden): TEMP 상수들 제거 및 교체
const TEMP_ISSUE_API = 'http://43.200.199.205:8080/api/issues/1';

const IssueDetailPage = () => {
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
    fetchData(TEMP_ISSUE_API);
  }, []);

  return (
    <>
      <section className="flex justify-between">
        {issueDetailData && <IssueMainInfo issueDetailData={issueDetailData} />}
        <IssueController />
      </section>
      <div className="mt-6 h-6 border-t border-t-gray-300"></div>
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
              labels={issueDetailData.labelList}
              milestone={issueDetailData.milestone}
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
    </>
  );
};

export default IssueDetailPage;
