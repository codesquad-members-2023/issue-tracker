import {
  SET_WRITTEN_BY_ME_FILTER_OPTION,
  SET_ASSIGNED_TO_ME_FILTER_OPTION,
  SET_COMMENTED_BY_ME_FILTER_OPTION,
  SET_ASSIGNEE_FILTER_OPTION,
  SET_LABELS_FILTER_OPTION,
  SET_MILESTONE_FILTER_OPTION,
  SET_AUTHOR_FILTER_OPTION,
  SET_PAGE_FILTER_OPTION,
  SET_MAIN_PAGE_STATE,
  FETCH_START,
  FETCH_SUCCESS,
  FETCH_ERROR,
  RESET_FILTER_OPTIONS,
  SET_ISSUE_STATE_FILTER_OPTION,
} from './MainPageActionTypes';

export const setMainPageState = (state) => ({
  type: SET_MAIN_PAGE_STATE,
  payload: state,
});

export const fetchStart = () => ({
  type: FETCH_START,
});

export const fetchSuccess = () => ({
  type: FETCH_SUCCESS,
});

export const fetchError = () => ({
  type: FETCH_ERROR,
});

export const filterOptions = {
  reset: (value) => ({
    type: RESET_FILTER_OPTIONS,
    payload: value,
  }),
  issueState: (value) => ({
    type: SET_ISSUE_STATE_FILTER_OPTION,
    payload: value,
  }),
  writtenByMe: (value) => ({
    type: SET_WRITTEN_BY_ME_FILTER_OPTION,
    payload: value,
  }),
  assignedToMe: (value) => ({
    type: SET_ASSIGNED_TO_ME_FILTER_OPTION,
    payload: value,
  }),
  commentedByMe: (value) => ({
    type: SET_COMMENTED_BY_ME_FILTER_OPTION,
    payload: value,
  }),
  assignee: (value) => ({
    type: SET_ASSIGNEE_FILTER_OPTION,
    payload: value,
  }),
  labels: (value) => ({
    type: SET_LABELS_FILTER_OPTION,
    payload: value,
  }),
  milestone: (value) => ({
    type: SET_MILESTONE_FILTER_OPTION,
    payload: value,
  }),
  author: (value) => ({
    type: SET_AUTHOR_FILTER_OPTION,
    payload: value,
  }),
  page: (value) => ({
    type: SET_PAGE_FILTER_OPTION,
    payload: value,
  }),
};

export const setFilterOption = (targetOption, value) => {
  return filterOptions[targetOption](value);
};
