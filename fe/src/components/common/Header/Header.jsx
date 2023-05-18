import { styled } from 'styled-components';
import { UserIcon } from '../UserIcon/UserIcon';
import { ReactComponent as Logo } from '../../../assets/LogotypeMedium.svg';
import userImageLarge from '../../../assets/userImageLarge.svg';
import Toggle from '../Toggle/Toggle';

export const Header = () => {
  return (
    <HeaderBox>
      <LogoBox />
      <div>
        <Toggle />
        <UserIcon imgSrc={userImageLarge} large />
      </div>
    </HeaderBox>
  );
};

const LogoBox = styled(Logo)`
  fill: ${({ theme }) => theme.color.neutralTextStrong};
`;

const HeaderBox = styled.header`
  display: flex;
  justify-content: space-between;

  padding: 27px 80px;

  > div {
    display: flex;
    gap: 24px;
  }
`;
