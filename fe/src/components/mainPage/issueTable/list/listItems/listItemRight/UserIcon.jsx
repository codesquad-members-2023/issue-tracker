import React from 'react';
import styled from 'styled-components';
import UserImage from '../../../../../../assets/userImage/UserImage.svg';

const UserIconBlock = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-position: center;
  background-size: cover;
  background-image: url(${({ authorUrl }) => authorUrl});
`;
const UserIcon = ({ authorUrl }) => {
  return <UserIconBlock authorUrl={authorUrl} />;
};

export default UserIcon;
