import styled from 'styled-components';
import UserImage from '@assets/images/UserImage.svg';

const UserIcon = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-position: center;
  background-size: cover;
  background-image: url(${UserImage});
`;

const MainContentContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 24px 0px 10px 0px;
`;

export { UserIcon, MainContentContainer };
