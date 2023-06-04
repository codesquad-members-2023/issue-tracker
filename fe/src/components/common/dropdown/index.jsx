import React, { useState, useEffect, useRef } from 'react';
import DropdownButton from './dropdownContent/dropdownButton';
import DropdownPanel from './dropdownContent/dropdownPanel';
import DropdownContainer from './style';
import apiUrl from '@utils/api/api';
import SelectedItem from './dropdownContent/selectedItem';

const Dropdown = ({ buttonId, title, filterState, filterClickHandler, dropdownStyle }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownContent, setDropdownContent] = useState(null);
  const ref = useRef();

  const fetchDropdownContent = async (buttonId) => {
    const url = `${apiUrl}/${buttonId === 'milestones' ? buttonId + '?isOpen=true' : buttonId}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchDropdownContent(buttonId);
      setDropdownContent(data);
    };

    if (isOpen) {
      fetchData();
    }
  }, [isOpen]);

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleToggleDropdown = () => {
    setIsOpen((prevState) => !prevState);
  };

  const getSelectedItem = (dropdownContent, buttonId, filterState) => {
    if (dropdownContent) {
      return dropdownContent[buttonId].find(({ id }) => id === filterState[buttonId]);
    }
    // const selectedItem = dropdownContent[buttonId].filter(({ id }) => id === filterState[buttonId]);
  };

  const selectedItem = getSelectedItem(dropdownContent, buttonId, filterState);

  return (
    <DropdownContainer ref={ref} dropdownStyle={dropdownStyle}>
      <DropdownButton
        onClick={handleToggleDropdown}
        buttonName={title}
        dropdownStyle={dropdownStyle}
      />
      {dropdownStyle === 'sidebar' && buttonId === 'assignees' && selectedItem && (
        <SelectedItem key={selectedItem.id} name={selectedItem.name} imgUrl={selectedItem.imgUrl} />
      )}
      {dropdownStyle === 'sidebar' && buttonId === 'labels' && selectedItem && (
        <SelectedItem title={selectedItem.title} bgColorCode={selectedItem.bgColorCode} />
      )}
      {dropdownStyle === 'sidebar' && buttonId === 'milestones' && selectedItem && (
        <SelectedItem key={selectedItem.id} title={selectedItem.title} />
      )}
      {isOpen && dropdownContent && (
        <DropdownPanel
          buttonName={title}
          buttonId={buttonId}
          filterState={filterState}
          filterClickHandler={filterClickHandler}
          content={dropdownContent}
          dropdownStyle={dropdownStyle}
          onClick={handleToggleDropdown}
        />
      )}
    </DropdownContainer>
  );
};

export default Dropdown;
