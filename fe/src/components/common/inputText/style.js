import styled from 'styled-components';

export const InputBox = styled.div`
  display: flex;
  align-items: center;
  padding: 0px 24px;
  width: 1008px;
  height: 40px;
  background-color: ${({ editState, theme }) =>
    editState ? theme.COLOR.GRAY50 : theme.COLOR.GRAY200};
  border-style: ${({ editState }) => (editState ? 'solid' : 'none')};
  border-color: ${({ theme }) => theme.COLOR.GRAY900};
  border-radius: 11px;
  gap: 50px;

  > input {
    width: 880px;
    height: 28px;
    background-color: transparent;
    border: none;
    outline: none;
  }

  > label {
    font-size: ${({ theme }) => theme.FONT_SIZE.S}px;
    font-weight: ${({ theme }) => theme.FONT_WEIGHT.REGULAR};
    color: ${({ theme }) => theme.COLOR.GRAY700};
  }
`;
