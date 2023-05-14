import { styled } from 'styled-components';

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;

  background: #fefefe;
  border-radius: 0rem 0rem 1.6rem 1.6rem;
  color: #4e4b66;
  font-weight: 400;
  font-size: 1.6rem;
`;

const DropDownBody = () => {
  return <StyledDiv>DropDownBody</StyledDiv>;
};

export default DropDownBody;
