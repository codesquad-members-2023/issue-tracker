import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { FILTER_TYPE, FILTER_NAME } from '../../../../constants/dropdownMenu';
import DropDown from '../../DropDown';

import { $SideBarMenu, $SelectedItem } from './style';

const SideBarMenu = ({ type, menus, selectedItemId, changeHandler }) => {
  const [selectedItem, setSelectedItem] = useState({
    type,
    id: selectedItemId,
  });

  const isSelected = selectedItem.id !== undefined;

  const findSelectedItemInfo = () => {
    return menus.filter((menu) => {
      let isMatched = false;

      if (FILTER_TYPE[type] === 'label' && menu.labelId === selectedItem.id) {
        isMatched = true;
      }
      if (FILTER_TYPE[type] === 'assignee' && menu.userId === selectedItem.id) {
        isMatched = true;
      }
      if (FILTER_TYPE[type] === 'milestone' && menu.milestoneId === selectedItem.id) {
        isMatched = true;
      }

      return isMatched;
    });
  };

  const selectedItemInfo = findSelectedItemInfo();

  useEffect(() => {
    changeHandler(selectedItem.id);
  }, [selectedItem.id]);

  return (
    <$SideBarMenu isselected={isSelected ? 1 : 0}>
      <DropDown
        type={FILTER_TYPE[type]}
        name={FILTER_NAME[type]}
        menus={menus}
        width={222}
        dropDownType="sideBar"
        position="center"
        onSelectItem={setSelectedItem}
        isSelectItem={selectedItem.id}
      />
      {isSelected && <$SelectedItem type={type} info={selectedItemInfo[0]} />}
    </$SideBarMenu>
  );
};

SideBarMenu.propTypes = {
  type: PropTypes.string.isRequired,
  menus: PropTypes.array.isRequired,
  selectedItemId: PropTypes.any,
  changeHandler: PropTypes.func,
};

export default SideBarMenu;
