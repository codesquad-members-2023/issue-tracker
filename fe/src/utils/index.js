import {
  CLOSED, ISSUE_STATE, NONE, OPENED,
} from '../constants';

export const generateQueryString = (options) => {
  const queryStringParams = [];

  const filterOptions = Object.entries(options);

  filterOptions.forEach(([key, value]) => {
    if (key === ISSUE_STATE) {
      if (value === OPENED) {
        queryStringParams.push('state=true');
      }
      if (value === CLOSED) {
        queryStringParams.push('state=false');
      }
    } else if (Array.isArray(value) && value.length > 0) {
      const values = value.map((name) => name).join(',');
      queryStringParams.push(`${key}=${values}`);
    } else if (!Array.isArray(value) && value) {
      queryStringParams.push(`${key}=${value}`);
    }
  });

  return queryStringParams.length > 0 ? `?${queryStringParams.join('&')}` : '';
};

export const updateArrayWithDuplicateCheck = (array, value) => {
  const hasNone = array.includes(NONE);
  const hasValue = array.includes(value);

  if (value === NONE) return hasNone ? [] : [value];
  if (hasNone) return [value];

  return hasValue ? array.filter((item) => item !== value) : [...array, value];
};

export const checkDuplicateAndReturnValue = (value, compareValue) => {
  return value === compareValue ? null : compareValue;
};

export const getElapsedTime = (createdDate) => {
  const currentDate = new Date();
  const issueCreatedDate = new Date(createdDate);
  const timeDifference = Math.floor(
    (currentDate - issueCreatedDate) / (1000 * 60),
  );

  if (timeDifference < 1) return '방금 전';
  if (timeDifference < 60) return `${timeDifference}분 전`;
  if (timeDifference < 1440) return `${Math.floor(timeDifference / 60)}시간 전`;
  return `${Math.floor(timeDifference / 1440)}일 전`;
};
