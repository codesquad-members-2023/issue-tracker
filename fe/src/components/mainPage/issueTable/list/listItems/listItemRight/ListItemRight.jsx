import React, { useContext } from 'react';
import styled from 'styled-components';
import UserIcon from './UserIcon';
import { MainPageInfoContext } from '../../../../../../pages/MainPage';

const ListItemRightBox = styled.div`
  margin-right: 10px;
`;

const ListItemRight = ({ issue: { authorUrl } }) => {
  return (
    <ListItemRightBox>
      <UserIcon authorUrl={authorUrl} />
    </ListItemRightBox>
  );
};

export default ListItemRight;
