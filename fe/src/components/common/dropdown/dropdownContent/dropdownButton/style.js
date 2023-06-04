import styled, { css } from 'styled-components';

const displays = {
  sidebar: {
    display: 'flex',
    'justify-content': 'space-between',
    width: '200px',
  },
  filter: {
    display: 'flex',
    gap: '7px',
  },
};

const displayStyles = css`
  ${({ dropdownStyle }) =>
    displays &&
    displays[dropdownStyle] &&
    css`
      ${displays[dropdownStyle]}
    `}
`;

const DropdownButtonBlock = styled.button`
  ${displayStyles}
  align-items: center;
  background-color: transparent;
  color: ${({ theme }) => theme.COLOR.GRAY600};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.BOLD};
`;
// TODO: props에 따라서, gap 크기를 다르게 줘아함 5px과 16px

export default DropdownButtonBlock;
