import styled from 'styled-components';

const ContainerButton = ({ onclick, children }) => {
  return <ContainerButtonBox onClick={onclick}>{children}</ContainerButtonBox>;
};

export default ContainerButton;

const ContainerButtonBox = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;

  padding: 0px 16px;
  border-radius: 11px;
  font-weight: 700;
  font-size: 12px;
  width: 120px;
  height: 40px;
  color: ${({ theme }) => theme.color.accentText};
  background-color: ${({ theme }) => theme.color.accentBackground};
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.color.neutralText};
    > svg {
      stroke: ${({ theme }) => theme.color.neutralText};
    }
  }
  &:active {
    background-color: ${({ theme }) => theme.color.neutralBackgroundBold};
  }
`;
