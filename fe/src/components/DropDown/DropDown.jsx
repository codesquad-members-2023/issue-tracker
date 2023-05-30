import { useEffect, useRef, useState } from 'react';
import { styled } from 'styled-components';
import { ChevronDown } from '../common';
import DropDownHeader from './DropDownContent/DropDownHeader/DropDownHeader';
import DropDownBody from './DropDownContent/DropDownBody/DropDownBody';
import DropDownContent from './DropDownContent/DropDownContent';

const DropDown = ({
  className,
  config: {
    buttonText, headerText, bodyItems, bodyCheck, pos, marginTop,
  },
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const DropDownRef = useRef();

  useEffect(() => {
    const handleClickOutside = ({ target }) => {
      if (!DropDownRef.current?.contains(target)) setIsOpen(false);
    };

    document.addEventListener('click', handleClickOutside, true);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <DropDownBox ref={DropDownRef} className={className}>
      <DropDownButton
        type="button"
        onClick={() => setIsOpen((prevIsOpen) => !prevIsOpen)}
      >
        <span>{buttonText}</span>
        <ChevronDown />
      </DropDownButton>
      {isOpen && (
        <DropDownContent pos={pos} marginTop={marginTop}>
          {headerText && <DropDownHeader headerText={headerText} />}
          <DropDownBody
            headerText={headerText}
            bodyItems={bodyItems}
            bodyCheck={bodyCheck}
            handleIsOpen={setIsOpen}
          />
        </DropDownContent>
      )}
    </DropDownBox>
  );
};

export default DropDown;

const DropDownBox = styled.div`
  position: relative;
`;

const DropDownButton = styled.button`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;

  width: 100%;
  height: 100%;
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  font-size: ${({ theme }) => theme.fontSize.M.size};
  line-height: ${({ theme }) => theme.fontSize.M.lineHeight};
`;
