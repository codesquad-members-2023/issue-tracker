import React, { createContext, useReducer } from 'react';
import {
  FETCH_ERROR,
  FETCH_START,
  FETCH_SUCCESS,
  SET_MAIN_PAGE_STATE,
} from './MainPageActionTypes';

export const MainPageStateContext = createContext(null);
export const MainPageStateDispatchContext = createContext(null);

const mainPageReducer = (state, action) => {
  switch (action.type) {
    case SET_MAIN_PAGE_STATE:
      return {
        ...state,
        ...action.payload,
      };
    case FETCH_START:
      return {
        ...state,
        loading: true,
      };
    case FETCH_SUCCESS:
    case FETCH_ERROR:
      return {
        ...state,
        loading: false,
      };
    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
};

export const MainPageInitialState = {
  issues: [],
  counts: {},
  allUsers: [],
  allLabels: [],
  allMilestones: [],
  paging: {},
  loading: false,
};

const MainPageStateProvider = ({ children }) => {
  const [mainPageState, mainPageDispatch] = useReducer(
    mainPageReducer,
    MainPageInitialState,
  );

  return (
    <MainPageStateContext.Provider value={mainPageState}>
      <MainPageStateDispatchContext.Provider value={mainPageDispatch}>
        {children}
      </MainPageStateDispatchContext.Provider>
    </MainPageStateContext.Provider>
  );
};

export default MainPageStateProvider;
