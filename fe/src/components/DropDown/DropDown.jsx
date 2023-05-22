import { useEffect, useRef, useState } from 'react';
import { styled } from 'styled-components';
import { ChevronDown } from '../common';
import DropDownHeader from './DropDownContent/DropDownHeader/DropDownHeader';
import DropDownBody from './DropDownContent/DropDownBody/DropDownBody';
import DropDownContent from './DropDownContent/DropDownContent';

const DropDown = ({
  className,
  config: {
    buttonText, headerText, bodyItems, bodyCheck, posright, marginTop,
  },
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const divEl = useRef();

  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!divEl.current.contains(target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('click', clickHandler);

    return () => {
      document.removeEventListener('click', clickHandler);
    };
  }, []);

  return (
    <DropDownBox ref={divEl} className={className}>
      <button
        type="button"
        onClick={() => setIsOpen((prevIsOpen) => !prevIsOpen)}
      >
        <span>{buttonText}</span>
        <ChevronDown />
      </button>
      {isOpen && (
        <DropDownContent posright={posright} marginTop={marginTop}>
          <DropDownHeader headerText={headerText} />
          <DropDownBody
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

  button {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;

    width: 100%;
    height: 100%;
    font-weight: ${({ theme }) => theme.fontWeight.bold};
    font-size: ${({ theme }) => theme.fontSize.M.size};
    line-height: ${({ theme }) => theme.fontSize.M.lineHeight};
  }
`;
