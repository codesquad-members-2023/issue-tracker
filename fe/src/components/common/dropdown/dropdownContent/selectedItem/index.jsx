import React from 'react';
import SelectedItemBox from './style';
import UserIcon from '@components/common/icon/UserIcon';
import Label from '@components/issueList/issueTable/list/listItems/listItemLeft/listItemLeftContent/LeftContentTop/Label';

const SelectedItem = ({ name, imgUrl, title, bgColorCode }) => {
  return (
    <SelectedItemBox>
      {imgUrl && <UserIcon userImgUrl={imgUrl} alt={name} />}
      {name && <span>{name}</span>}
      {bgColorCode && <Label labelName={title} bgColorCode={bgColorCode} />}
      {!bgColorCode && title && <span>{title}</span>}
    </SelectedItemBox>
  );
};

export default SelectedItem;
