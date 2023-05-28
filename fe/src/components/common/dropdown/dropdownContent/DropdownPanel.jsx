import styled from 'styled-components';
import CheckOffCircle from '../../../../assets/icons/CheckOffCircle.svg';

// 스타일 중복되는 부분 리팩토링 작업 필요
const DropdownPanelBlock = styled.div`
  position: absolute;
  top: 30px;
  right: -10px;
  display: flex;
  flex-direction: column;
  width: 240px;
  border: 1px solid ${({ theme }) => theme.COLOR.GRAY300};
  border-radius: 16px;

  > ul > div {
    display: flex;
  }

  > ul > li > div > img {
    width: 13px;
    margin-right: 8px;
  }

  ul > li {
    height: 45px;
    background-color: ${({ theme }) => theme.COLOR.GRAY50};
    padding: 8px 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    border-bot tom: 1px solid ${({ theme }) => theme.COLOR.GRAY300};
    &:last-child {
      border-radius: 0px 0px 16px 16px;
    }
    &:not(:last-child) {
      border-bottom: 1px solid ${({ theme }) => theme.COLOR.GRAY300};
    }
  }
`;

const PanelHeaderBlock = styled.div`
  height: 36px;
  background: #f7f7fc;
  font-weight: 500;
  font-size: 12px;
  padding: 8px 16px;
  border-radius: 16px 16px 0px 0px;
  border-bottom: 1px solid ${({ theme }) => theme.COLOR.GRAY300};
`;

const DropdownPanel = ({ content, contentkey }) => {
  return (
    <DropdownPanelBlock>
      <PanelHeaderBlock>filter</PanelHeaderBlock>
      <ul>
        {content[contentkey]?.map(({ id, name, imgUrl }) => (
          <li key={id}>
            <div>
              <img src={imgUrl} alt="assignImage" />
              <span>{name}</span>
            </div>

            <img src={CheckOffCircle} alt="checkCircle" />
          </li>
        ))}
      </ul>
    </DropdownPanelBlock>
  );
};

export default DropdownPanel;
