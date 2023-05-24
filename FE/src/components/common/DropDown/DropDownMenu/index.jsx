import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import { FilterDispatchContext, FilterStateContext } from '../../../../context/filterContext';
import { FILTER_ACTION_TYPES } from '../../../../context/filterReducer';

import Icon from '../../Icon';
import { $MenuWrapper, $MenuLeftWrapper, $MenuImg, $MenuText, $LabelColor } from './style';

const DropDownMenu = ({ menuId, menuType, menuImg = null, menuText, backgroundColor, dropDownType }) => {
  if (dropDownType !== 'sideBar') {
    const filterDispatch = useContext(FilterDispatchContext);

    const filterState = useContext(FilterStateContext);
    const checkedOption = filterState[menuType];

    const isChecked = checkedOption === menuId;
    const menuClickHandler = () => {
      filterDispatch({ type: FILTER_ACTION_TYPES.CLICK_MENU, payload: { filterType: menuType, id: menuId } });
    };

    return (
      <$MenuWrapper type="button" onClick={dropDownType !== 'sideBar' ? menuClickHandler : () => {}}>
        <$MenuLeftWrapper>
          {backgroundColor && <$LabelColor backgroundColor={backgroundColor} />}
          {menuImg !== null && <$MenuImg src={menuImg} />}
          <$MenuText $isChecked={isChecked}>{menuText}</$MenuText>
        </$MenuLeftWrapper>
        <Icon name={isChecked ? 'checkOnCircle' : 'checkOffCircle'} />
      </$MenuWrapper>
    );
  }

  const isChecked = false;

  return (
    <$MenuWrapper type="button" onClick={() => {}}>
      <$MenuLeftWrapper>
        {backgroundColor && <$LabelColor backgroundColor={backgroundColor} />}
        {menuImg !== null && <$MenuImg src={menuImg} />}
        <$MenuText $isChecked={isChecked}>{menuText}</$MenuText>
      </$MenuLeftWrapper>
      <Icon name={isChecked ? 'checkOnCircle' : 'checkOffCircle'} />
    </$MenuWrapper>
  );
};

DropDownMenu.propTypes = {
  menuId: PropTypes.oneOfType(['string', 'number']),
  menuType: PropTypes.string.isRequired,
  menuImg: PropTypes.string,
  menuText: PropTypes.string.isRequired,
  backgroundColor: PropTypes.string,
  dropDownType: PropTypes.string,
};

export default DropDownMenu;
