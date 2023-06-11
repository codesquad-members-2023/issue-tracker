import React, { useState } from 'react';
import PropTypes from 'prop-types';

import useFetch from '../../../../hooks/useFetch';
import { LABELS } from '../../../../constants/api';

import Button from '../../../common/Button';
import Icon from '../../../common/Icon';
import Label from '../../../common/Label';
import LabelTable from '../../LabelTable';
import { $LabelListItem, $LabelLayout, $LabelContent, $ButtonsLayout, $LabelInfo } from './style';

const LabelListItem = ({ labelId, name, content, backgroundColor, fontColor = 'dark', getNewLabelData }) => {
  const [isLabelTableOpened, setIsLabelTableOpened] = useState(false);

  const { fetchData: deleteLabel } = useFetch(LABELS.DELETE_LABEL(labelId), 'DELETE', {}, true);

  const openLabelTableHandler = () => setIsLabelTableOpened(true);
  const closeLabelTableHandler = () => setIsLabelTableOpened(false);
  const deleteLabelHandler = async () => {
    // TODO: 해당 label를 삭제하는 기능 구현
    await deleteLabel();
    getNewLabelData();
  };

  return isLabelTableOpened ? (
    <LabelTable
      type="edit"
      labelId={labelId}
      labelName={name}
      content={content}
      backgroundColor={backgroundColor}
      fontColor={fontColor}
      closeHandler={closeLabelTableHandler}
      getNewLabelData={getNewLabelData}
    />
  ) : (
    <$LabelListItem>
      <$LabelInfo>
        <$LabelLayout>
          <Label height={24} name={name} fontColor={fontColor} backgroundColor={backgroundColor} />
        </$LabelLayout>

        <$LabelContent>{content || '레이블에 대한 설명이 없습니다.'}</$LabelContent>
      </$LabelInfo>

      <$ButtonsLayout>
        <Button type="ghost" size="S" onClick={openLabelTableHandler}>
          <Icon name="edit" />
          <p>편집</p>
        </Button>
        <Button type="ghost" size="S" onClick={deleteLabelHandler} colorstype="danger" fill="#FF3B30">
          <Icon name="trash" />
          <p>삭제</p>
        </Button>
      </$ButtonsLayout>
    </$LabelListItem>
  );
};

LabelListItem.propTypes = {
  labelId: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  content: PropTypes.string,
  backgroundColor: PropTypes.string.isRequired,
  fontColor: PropTypes.oneOf(['dark', 'light']).isRequired,
  getNewLabelData: PropTypes.func.isRequired,
};

export default LabelListItem;
