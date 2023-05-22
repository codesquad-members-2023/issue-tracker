import { styled } from 'styled-components';

const DropDownContent = ({ children, posright, marginTop }) => {
  return (
    <DropDownContentBox $posright={posright} margintop={marginTop}>
      {children}
    </DropDownContentBox>
  );
};

export default DropDownContent;

const DropDownContentBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1px;
  position: absolute;

  width: 240px;
  background: ${({ theme }) => theme.color.neutralBorder};
  border: 1px solid ${({ theme }) => theme.color.neutralBorder};
  box-shadow: 0px 0px 8px rgba(20, 20, 43, 0.04);
  border-radius: 16px;
  ${({ $posright }) => ($posright ? 'right: 0;' : 'left: 0;')}
  ${({ margintop }) => `margin-top:  ${margintop || '10px'}`}
`;
