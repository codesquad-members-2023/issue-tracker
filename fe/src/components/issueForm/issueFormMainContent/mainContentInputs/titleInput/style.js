import styled from 'styled-components';

const TitleInputBox = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 895px;
  height: 60px;
  background-color: ${({ focusState, theme }) =>
    focusState ? theme.COLOR.GRAY50 : theme.COLOR.GRAY200};
  border: 1px ${({ focusState }) => (focusState ? 'solid' : 'none')}
    ${({ theme }) => theme.COLOR.GRAY900};
  border-radius: 16px;

  input {
    margin-top: 30px;
    border: 0;
    width: 840px;
    background-color: transparent;
    height: 20px;

    &:focus {
      outline: 0;
    }

    &:focus ~ label,
    &:valid ~ label {
      font-size: 12px;
      top: -5px;
      transition: all 0.2s ease;
    }
  }
`;

const TitleInputLabel = styled.label`
  position: absolute;
  top: -3px;
  left: 0;
  color: ${({ theme }) => theme.COLOR.GRAY600};
  padding: 20px 30px 16px 30px;
  transition: all 0.25s ease;
  cursor: text;
`;

export { TitleInputBox, TitleInputLabel };
