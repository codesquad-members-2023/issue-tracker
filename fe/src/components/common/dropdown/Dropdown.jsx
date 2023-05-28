import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import DropdownButton from './dropdownContent/DropdownButton';
import DropdownPanel from './dropdownContent/DropdownPanel';

const DropdownContainer = styled.div`
  position: relative;
`;

const Dropdown = ({ contentKey, title, fetchDropdownContent }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownContent, setDropdownContent] = useState([]);
  const ref = useRef();

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchDropdownContent();
      setDropdownContent(data);
    };

    if (isOpen) {
      fetchData();
    }
  }, [isOpen, fetchDropdownContent]);

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

  return (
    <DropdownContainer ref={ref}>
      <DropdownButton buttonName={title} onClick={handleToggleDropdown} />
      {isOpen && <DropdownPanel contentkey={contentKey} content={dropdownContent} />}
    </DropdownContainer>
  );
};

export default Dropdown;
