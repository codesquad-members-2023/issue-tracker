import React, { useState, useEffect, useReducer, createContext } from 'react';
import IssueTable from '@components/issueList/issueTable/IssueTable';
import Nav from '@components/issueList/nav/Nav';
import PageLayout from '@components/common/layout/PageLayout';
import apiUrl from '@utils/api/api';
import ResetFilterButton from '@components/issueList/resetButton';

export const IssueListStateContext = createContext();

const initialState = {
  isOpen: true,
  assignees: null,
  labels: null,
  milestones: null,
  writers: null,
};

const issueListReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'TOGGLE_OPEN_STATE':
      return { ...state, isOpen: payload };
    case `SET_ISSUE_STATE`:
      return state[payload.key] === payload.value
        ? { ...state, [payload.key]: null }
        : { ...state, [payload.key]: payload.value };
    case `RESET_STATE`:
      return initialState;
    default:
      return state;
  }
};

const generateQuery = (issueState) => {
  const query = Object.entries(issueState)
    .reduce((acc, [key, value]) => {
      if (key === 'isOpen') {
        return acc + `issues?isOpen=${value}&`;
      } else if (value !== null) {
        return acc + `${key}=${value}&`;
      }
      return acc;
    }, '')
    .slice(0, -1);

  return `${apiUrl}/${query}`;
};

const IssueList = () => {
  const [issueListState, dispatch] = useReducer(issueListReducer, initialState);
  const [issueListData, setIssuePageData] = useState(null);
  const fetchData = async () => {
    try {
      const url = generateQuery(issueListState);
      const response = await fetch(url);
      const issueListData = await response.json();
      setIssuePageData(issueListData);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [issueListState]);

  const resetFilterClickHandler = () => {
    dispatch({ type: 'RESET_STATE' });
  };

  const compareStateObject = (initialState, changedState) => {
    for (const key in initialState) {
      if (initialState[key] !== changedState[key]) {
        return false;
      }
    }
    return true;
  };

  const generateIssueListStateText = (issueState) => {
    const issueListStateText = Object.entries(issueState)
      .reduce((acc, [key, value]) => {
        if (key === 'isOpen') {
          return acc + `isOpen:${value === true ? 'open' : 'close'} `;
        } else if (value !== null) {
          return acc + `${key}:${value} `;
        }
        return acc;
      }, 'is:issue ')
      .slice(0, -1);

    return issueListStateText;
  };

  const isShowResetFilterButton = compareStateObject(initialState, issueListState);
  const issueListStateText = generateIssueListStateText(issueListState);

  return (
    <PageLayout>
      <IssueListStateContext.Provider
        value={{ issueListState, issueListStateText, dispatch, issueListData }}
      >
        <Nav />
        {!isShowResetFilterButton && <ResetFilterButton onClick={resetFilterClickHandler} />}
        {issueListData && <IssueTable />}
      </IssueListStateContext.Provider>
    </PageLayout>
  );
};

export default IssueList;
