import { URL } from '@constants/api';
import { customFetch } from '@services/api';
import { createContext } from 'react';
import { removeEmptyKeyValues, deepCopy } from '@utils/index';

export const filterContext = createContext();

export const getIssueDetail = async ({ issueId }) => {
  try {
    const response = await fetch(`${URL}/issue/${issueId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'appilcation/json',
      },
    });
    if (!response.ok) {
      throw Error(response.statusText);
    }
    const issueData = await response.json();
    return issueData;
  } catch (error) {
    console.error('Error fetching issue:', error);
  }
};

export const getIssueList = async ({
  status = 'open',
  page = 0,
  assignee,
  label,
  milestone,
  writer,
  commentBy,
}) => {
  try {
    const response = await customFetch({
      path: '/issues',
      method: 'GET',
      queries: {
        status,
        page,
        maxPageNum: 10,
        assignee,
        label,
        milestone,
        writer,
        commentBy,
      },
    });

    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const convertFilterToString = (filters) => {
  const copiedFilters = { ...filters };
  removeEmptyKeyValues(copiedFilters);
  const stringfiedFilters = Object.entries(copiedFilters)
    .map((filter) => {
      const [key, value] = filter;
      return `${key}:${value}`;
    })
    .join(', ');
  return stringfiedFilters;
};

export const updateCountsToTabInfo = (
  labelAndMilestoneInfo,
  labelLength,
  milestoneLength
) => {
  const counts = {
    label: labelLength,
    milestone: milestoneLength,
  };

  const copiedInfo = deepCopy(labelAndMilestoneInfo);
  copiedInfo.forEach((_, i) => {
    copiedInfo[i].count = counts[copiedInfo[i].id];
  });
  return copiedInfo;
};

export const isFilterApplied = (filters, initialFilter) =>
  JSON.stringify(filters) !== JSON.stringify(initialFilter);
