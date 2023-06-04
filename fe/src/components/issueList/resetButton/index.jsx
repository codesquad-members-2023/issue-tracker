import React from 'react';
import ResetFilterButtonBlock from './style';
import XSquareIcon from '@assets/icons/XSquareIcon.svg';

const ResetFilterButton = ({ onClick }) => {
  return (
    <ResetFilterButtonBlock onClick={onClick}>
      <img src={XSquareIcon} alt={XSquareIcon} />
      <span>현재의 검색 필터 및 정렬 지우기</span>
    </ResetFilterButtonBlock>
  );
};

export default ResetFilterButton;
