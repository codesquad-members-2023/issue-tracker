import styled from 'styled-components';
import Logo from '../../../assets/images/Logo.svg';
import UserImageLarge from '../../../assets/images/UserImageLarge.svg';

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 50px;
`;

const UserImage = styled.img`
  width: 32px;
  height: 32px;
`;

const Header = () => {
  return (
    <HeaderContainer>
      <img src={Logo} />
      <UserImage src={UserImageLarge} />
    </HeaderContainer>
  );
};

export default Header;
