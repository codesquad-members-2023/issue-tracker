import React, { useEffect, useState } from 'react';

import Header from '@components/Header/Header';
import IssueMainInfo from '@components/IssueMainInfo/IssueMainInfo';

import { IssueDetailData } from '@customTypes/IssueDetailPage';
import IssueController from '@components/IssueController/IssueController';
import IssueCommentList from '@components/IssueCommentList/IssueCommentList';

// TODO(Jayden): TEMP 상수들 제거 및 교체
const TEMP_PROFILE_URL =
  'https://images.unsplash.com/photo-1546527868-ccb7ee7dfa6a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80';
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
      {/* Header (TODO(Jayden): 추후 router로 빼기) */}
      <Header url={TEMP_PROFILE_URL} />
      <section className="flex justify-between">
        {issueDetailData && <IssueMainInfo issueDetailData={issueDetailData} />}
        <IssueController />
      </section>
      <div className="mt-6 h-6 border-t border-t-gray-300"></div>
      <section className="h-fit">
        <section className="h-fit">
          {/* IssueCommentList - IssueCommentItem */}
          {issueDetailData && (
            <IssueCommentList
              comments={issueDetailData.commentList}
              issue={issueDetailData.issue}
            />
          )}
          {/* IssueCommentInput - AddFileButton */}
          {/* AddCommentButton */}
        </section>
        <section>
          {/* IssueSubInfo */}
          {/* DeleteIssueButton */}
        </section>
      </section>
    </>
  );
};

export default IssueDetailPage;
