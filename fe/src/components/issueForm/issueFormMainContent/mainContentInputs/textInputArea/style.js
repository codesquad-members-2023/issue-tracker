import styled from 'styled-components';

export const StyledInputContainer = styled.div`
  position: relative;
  align-items: center;
  display: flex;
  flex-direction: column;
  width: 895px;
  height: 350px;
  background-color: ${({ focusState, theme }) =>
    focusState ? theme.COLOR.GRAY50 : theme.COLOR.GRAY200};
  border: 1px ${({ focusState }) => (focusState ? 'solid' : 'none')}
    ${({ theme }) => theme.COLOR.GRAY900};
  border-radius: 16px;

  textarea {
    margin-top: 50px;
    border: 0;
    width: 840px;
    background-color: transparent;
    height: 218px;

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

export const StyledLabel = styled.label`
  position: absolute;
  top: 10px;
  left: 0;
  color: ${({ theme }) => theme.COLOR.GRAY600};
  padding: 20px 30px 16px 30px;
  transition: all 0.25s ease;
  cursor: text;
`;

export const CountBox = styled.span`
  position: absolute;
  right: 50px;
  bottom: 80px;
  color: ${({ theme }) => theme.COLOR.GRAY600};
  font-size: 12px;
`;

export const UploadFileBox = styled.div`
  position: absolute;
  bottom: 20px;
  display: flex;
  align-items: flex-end;
  width: 100%;
  height: 40px;
  padding-left: 30px;
  border-top: 1px dashed ${({ theme }) => theme.COLOR.GRAY300};

  > input {
    visibility: hidden;
  }
`;
