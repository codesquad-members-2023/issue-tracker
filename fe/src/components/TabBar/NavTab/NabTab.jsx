import styled from 'styled-components';
import { Button } from '../../common';
import { ReactComponent as label } from '../../../assets/label.svg';
import { ReactComponent as mileStone } from '../../../assets/mileStone.svg';
import { ReactComponent as plus } from '../../../assets/plus.svg';

const NabTab = () => {
  return (
    <NabTabBox>
      <div>
        <Button
          handleButton={() => {}}
          buttonText="레이블"
          count="2"
          gap="4px"
          width="160px"
          fontWeight="bold"
          fontSize="M"
          color="neutralText"
        >
          <LableIcon />
        </Button>
        <Button
          handleButton={() => {}}
          buttonText="마일스톤"
          count="2"
          gap="4px"
          width="160px"
          fontWeight="bold"
          fontSize="M"
          color="neutralText"
        >
          <MileStoneIcon />
        </Button>
      </div>
      <Button
        handleButton={() => {}}
        buttonText="이슈 작성"
        gap="7px"
        width="120px"
        fontWeight="bold"
        fontSize="S"
        color="accentText"
        backgroundColor="accentBackground"
        borderRadius="11px"
      >
        <PlusIcon />
      </Button>
    </NabTabBox>
  );
};

export default NabTab;

const NabTabBox = styled.div`
  display: flex;
  gap: 16px;

  background: ${({ theme }) => theme.color.neutralBackground};

  > div {
    display: flex;
    border: 1px solid ${({ theme }) => theme.color.neutralBorder};

    border-radius: 11px;
  }
`;

const LableIcon = styled(label)`
  stroke: ${({ theme }) => theme.color.neutralText};
`;

const MileStoneIcon = styled(mileStone)`
  fill: ${({ theme }) => theme.color.neutralText};
`;

const PlusIcon = styled(plus)`
  stroke: ${({ theme }) => theme.color.accentText};
`;
