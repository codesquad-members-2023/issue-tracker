import React from 'react';
import Header from '@components/Header/Header';

const IssueDetailPage = () => {
  const TEMP_PROFILE_URL =
    'https://images.unsplash.com/photo-1546527868-ccb7ee7dfa6a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80';
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
