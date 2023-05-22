import { styled } from 'styled-components';
import { ReactComponent as CheckOffCircle } from '../../../../assets/checkOffCircle.svg';
import { ReactComponent as CheckOnCircle } from '../../../../assets/checkOnCircle.svg';

const DropDownBody = ({ bodyItems, bodyCheck, handleIsOpen }) => {
  const itemList = bodyItems.map(({
    img, text, onClick, checked,
  }) => {
    return (
      <li
        key={text}
        onClick={() => {
          handleIsOpen(false);
          if (typeof onClick === 'function') {
            onClick();
          }
        }}
      >
        <IconTextBox checked={checked}>
          {img && <img src={img} alt="img" />}
          <span>{text}</span>
        </IconTextBox>
        {bodyCheck
          && (checked ? <CheckOnCircleImage /> : <CheckOffCircleImage />)}
      </li>
    );
  });

  return <DropDownBodyList>{itemList}</DropDownBodyList>;
};

export default DropDownBody;

const CheckOnCircleImage = styled(CheckOnCircle)`
  stroke: ${({ theme }) => theme.color.neutralTextStrong};
`;
const CheckOffCircleImage = styled(CheckOffCircle)`
  stroke: ${({ theme }) => theme.color.neutralTextStrong};
`;

const DropDownBodyList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1px;

  color: ${({ theme }) => theme.color.neutralTextStrong};
  font-weight: ${({ theme }) => theme.fontWeight.regular};
  font-size: ${({ theme }) => theme.fontSize.M.size};
  line-height: ${({ theme }) => theme.fontSize.M.lineHeight};
  border-radius: 0px 0px 16px 16px;
  background: ${({ theme }) => theme.color.neutralBorder};

  li {
    display: flex;
    justify-content: space-between;
    padding: 8px 16px;
    background: ${({ theme }) => theme.color.neutralBackgroundStrong};
    cursor: pointer;
  }

  li:last-child {
    border-radius: 0px 0px 16px 16px;
  }
`;

const IconTextBox = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  span {
    font-weight: ${({ theme, checked }) => (checked ? theme.fontWeight.bold : theme.fontWeight.regular)};
  }
`;
