import React, { useState, useEffect, createContext } from 'react';
import IssueTable from '../components/mainPage/issueTable/IssueTable';
import Nav from '../components/mainPage/nav/Nav';
import PageLayout from '../components/common/layout/PageLayout';
import apiUrl from '../utils/api/api';

export const MainPageInfoContext = createContext();

const MainPage = () => {
  const [isIssueOpen, setIssueState] = useState(true);
  const [issuePageData, setIssuePageData] = useState(null);

  const fetchData = async () => {
    try {
      const url = isIssueOpen ? `${apiUrl}/issues?status=open` : `${apiUrl}/issues?status=closed`;
      const response = await fetch(url);
      const issuePageData = await response.json();
      setIssuePageData(issuePageData);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [isIssueOpen]);

  return (
    <PageLayout>
      <MainPageInfoContext.Provider value={{ isIssueOpen, setIssueState, issuePageData }}>
        <Nav />
        {issuePageData && <IssueTable />}
      </MainPageInfoContext.Provider>
    </PageLayout>
  );
};

export default MainPage;
