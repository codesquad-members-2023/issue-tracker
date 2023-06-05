import styled from 'styled-components';

const OutlineButton = ({ onclick, children }) => {
  return <OutlineButtonBox onClick={onclick}>{children}</OutlineButtonBox>;
};

export default OutlineButton;

const OutlineButtonBox = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;

  padding: 0px 16px;
  width: 120px;
  height: 40px;
  border: 1px solid ${({ theme }) => theme.color.accentBorderWeak};
  border-radius: 11px;
  font-weight: 700;
  font-size: 12px;
  color: ${({ theme }) => theme.color.accentBorderWeak};
  cursor: pointer;
`;
