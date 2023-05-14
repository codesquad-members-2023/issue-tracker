import { styled } from 'styled-components';

const StyledDiv = styled.div`
  display: flex;
  align-items: center;
  padding: 0.8rem 1.6rem;
  gap: 0.8rem;

  background: #f7f7fc;
  border-radius: 16px 16px 0px 0px;
  font-weight: 500;
  font-size: 1.2rem;
  color: #14142b;
  cursor: initial;
`;

const DropDownHead = ({ className, children }) => {
  return <StyledDiv className={className}>{children}</StyledDiv>;
};

export default DropDownHead;
