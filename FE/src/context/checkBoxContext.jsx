import React, { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';

const CheckBoxContext = createContext([]);

const useCheckBoxContext = () => {
  const checkBox = useContext(CheckBoxContext);

  if (checkBox.length === 0) {
    throw new Error('useCheckBoxContext should be used within CheckBoxProvider');
  }

  return checkBox;
};

const CheckBoxProvider = ({ children }) => {
  const [checkList, setCheckList] = useState([]);

  const checkBoxHandler = (issueId) => {
    if (checkList.includes(issueId)) {
      setCheckList((prev) => prev.filter((checkedItem) => checkedItem !== issueId));
    } else {
      setCheckList((prev) => [...prev, issueId]);
    }
  };

  const resetCheckList = () => {
    setCheckList([]);
  };

  const allCheck = (issueIds) => {
    setCheckList([...issueIds]);
  };

  return (
    <CheckBoxContext.Provider value={{ checkList, checkBoxHandler, resetCheckList, allCheck }}>
      {children}
    </CheckBoxContext.Provider>
  );
};

CheckBoxProvider.propTypes = {
  children: PropTypes.any,
};

export { useCheckBoxContext, CheckBoxProvider };
