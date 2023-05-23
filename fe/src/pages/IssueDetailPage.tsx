import React from 'react';

import Header from '@components/Header/Header';

const TEMP_PROFILE_URL =
  'https://images.unsplash.com/photo-1546527868-ccb7ee7dfa6a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80';
const TEMP_ISSUE_API = 'http://43.200.199.205:8080/api/issues/1';
const fetchData = async (api: string) => {
  try {
    const res = await fetch(api);
    const data = await res.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

const IssueDetailPage = () => {
  fetchData(TEMP_ISSUE_API);
  return (
    <>
      {/* Header (추후 router로 빼기) */}
      <Header url={TEMP_PROFILE_URL} />
      <section>
        {/* IssueMainInfo */}
        {/* IssueController - EditIssueTitleButton/CloseIssueButton*/}
      </section>
      <section>
        <section>
          {/* IssueCommentList - IssueCommentItem */}
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
