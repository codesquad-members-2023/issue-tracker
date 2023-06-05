import React, { createContext, useReducer } from 'react';
import { OPENED } from '../../constants';
import {
  checkDuplicateAndReturnValue,
  updateArrayWithDuplicateCheck,
} from '../../utils';
import {
  RESET_FILTER_OPTIONS,
  SET_ASSIGNEES_FILTER_OPTION,
  SET_AUTHOR_FILTER_OPTION,
  SET_ISSUE_STATE_FILTER_OPTION,
  SET_LABELS_FILTER_OPTION,
  SET_MILESTONE_NAME_FILTER_OPTION,
  SET_PAGE_FILTER_OPTION,
} from './MainPageActionTypes';

export const MainPageFilterContext = createContext(null);
export const MainPageFilterDispatchContext = createContext(null);

const filterOptionsReducer = (state, action) => {
  switch (action.type) {
    case RESET_FILTER_OPTIONS:
      return {
        ...state,
        ...action.payload,
      };
    case SET_ISSUE_STATE_FILTER_OPTION:
      return {
        ...state,
        issueState: action.payload,
        cntPage: 1,
      };
    case SET_ASSIGNEES_FILTER_OPTION:
      return {
        ...state,
        assignees: updateArrayWithDuplicateCheck(
          state.assignees,
          action.payload,
        ),
        cntPage: 1,
      };
    case SET_LABELS_FILTER_OPTION:
      return {
        ...state,
        labelNames: updateArrayWithDuplicateCheck(
          state.labelNames,
          action.payload,
        ),
        cntPage: 1,
      };
    case SET_MILESTONE_NAME_FILTER_OPTION:
      return {
        ...state,
        milestoneName: checkDuplicateAndReturnValue(
          state.milestoneName,
          action.payload,
        ),
        cntPage: 1,
      };
    case SET_AUTHOR_FILTER_OPTION:
      return {
        ...state,
        author: checkDuplicateAndReturnValue(state.author, action.payload),
        cntPage: 1,
      };
    case SET_PAGE_FILTER_OPTION:
      return {
        ...state,
        cntPage: action.payload,
      };
    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
};

export const MainPageInitialFilterOptions = {
  issueState: OPENED,
  writtenByMe: false,
  assignedToMe: false,
  commentedByMe: false,
  assignees: [],
  labelNames: [],
  milestoneName: null,
  author: null,
  cntPage: 1,
};

const MainPageFilterProvider = ({ children }) => {
  const [filterOptionsState, filterOptionsDispatch] = useReducer(
    filterOptionsReducer,
    MainPageInitialFilterOptions,
  );

  return (
    <MainPageFilterContext.Provider value={filterOptionsState}>
      <MainPageFilterDispatchContext.Provider value={filterOptionsDispatch}>
        {children}
      </MainPageFilterDispatchContext.Provider>
    </MainPageFilterContext.Provider>
  );
};

export default MainPageFilterProvider;
