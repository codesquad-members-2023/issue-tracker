import styled, { css } from 'styled-components';

const displays = {
  sidebar: {
    position: 'relative',
    display: 'flex',
    'flex-direction': 'column',
    'justify-content': 'center',
    'align-items': 'center',
    padding: '20px',
    gap: '30px',
    width: '300px',
    'flex-grow': '1',
    'border-bottom': '1px solid #D9DBE9',
  },
  filter: {
    position: 'relative',
  },
};

const displayStyles = css`
  ${({ dropdownStyle }) =>
    displays &&
    displays[dropdownStyle] &&
    css`
      ${displays[dropdownStyle]}

      &:first-child {
        border-radius: 16px 16px 0px 0px;
      }

      &:last-child {
        border-radius: 0px 0px 16px 16px;
      }
    `}
`;

const DropdownContainer = styled.div`
  ${displayStyles}
`;

export default DropdownContainer;
