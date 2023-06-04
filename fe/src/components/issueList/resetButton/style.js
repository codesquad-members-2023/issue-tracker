import styled from 'styled-components';

const ResetFilterButtonBlock = styled.button`
  display: flex;
  align-items: center;
  width: 180px;
  height: 20px;
  gap: 4px;

  font-size: ${({ theme }) => theme.FONT_SIZE.S}px;
  color: ${({ theme }) => theme.COLOR.GRAY700};
  background-color: transparent;
  margin-bottom: 20px;
  padding-left: 3px;

  & img {
    width: 16px;
    height: 16px;
  }
`;

export default ResetFilterButtonBlock;
