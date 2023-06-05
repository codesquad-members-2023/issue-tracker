import { useContext } from 'react';
import styled from 'styled-components';
import {
  ASSIGNEE,
  AUTHOR,
  ISSUE_TABLE_FILTER_OPTIONS,
  LABELS,
  MILESTONE,
} from './constant';
import { setFilterOption } from '../../../../../context/MainPage/MainPageActions';
import {
  MainPageFilterContext,
  MainPageFilterDispatchContext,
} from '../../../../../context/MainPage/MainPageFilterContext';
import { MainPageStateContext } from '../../../../../context/MainPage/MainPageStateContext';
import DropDown from '../../../../DropDown';
import { NONE } from '../../../../../constants';

const convertOptionItems = (
  optionItems,
  filterOptionState,
  dispatch,
  action,
  optionType,
) => {
  return optionItems.map((item) => {
    const optionId = item.name || item.id;
    const optionName = item.name || item.nickname;

    const isChecked = filterOptionState === null ? false : filterOptionState.includes(optionId);

    const dropDownBodyItemConfig = {
      key: item.id,
      text: optionName,
      checked: isChecked,
      handleItemClick: () => {
        dispatch(action(optionType, item.id));
      },
    };

    if (item.backgroundColor) dropDownBodyItemConfig.labelColor = item.backgroundColor;
    if (item.imgUrl) dropDownBodyItemConfig.userImage = item.imgUrl;
    return dropDownBodyItemConfig;
  });
};

const TableFilterButtons = () => {
  const { allUsers, allLabels, allMilestones } = useContext(MainPageStateContext);
  const filterOptions = useContext(MainPageFilterContext);
  const dispatch = useContext(MainPageFilterDispatchContext);

  const targetFilterOptions = { ...filterOptions };
  const filterDropDownConfigList = ISSUE_TABLE_FILTER_OPTIONS.map(
    (filterOption) => {
      const targetFilterOption = targetFilterOptions[filterOption.KEY];

      const isChecked = targetFilterOption === null
        ? false
        : targetFilterOptions[filterOption.KEY].includes(NONE);

      let bodyItems = filterOption.KO !== AUTHOR.KO
        ? [
          {
            key: NONE,
            text: `${filterOption.KO} 없는 이슈`,
            checked: isChecked,
            handleItemClick: () => {
              dispatch(setFilterOption(filterOption.KEY, NONE));
            },
          },
        ]
        : [];

      if (filterOption.KO === ASSIGNEE.KO || filterOption.KO === AUTHOR.KO) {
        bodyItems = bodyItems.concat(
          convertOptionItems(
            allUsers,
            targetFilterOption,
            dispatch,
            setFilterOption,
            filterOption.KEY,
          ),
        );
      } else if (filterOption.KO === LABELS.KO) {
        bodyItems = bodyItems.concat(
          convertOptionItems(
            allLabels,
            targetFilterOption,
            dispatch,
            setFilterOption,
            filterOption.KEY,
          ),
        );
      } else if (filterOption.KO === MILESTONE.KO) {
        bodyItems = bodyItems.concat(
          convertOptionItems(
            allMilestones,
            targetFilterOption,
            dispatch,
            setFilterOption,
            filterOption.KEY,
          ),
        );
      }

      return {
        buttonText: filterOption.KO,
        headerText: `${filterOption.KO} 필터`,
        bodyItems,
        bodyCheck: true,
        pos: 'right',
        marginTop: '10px',
      };
    },
  );

  const filterDropDownList = filterDropDownConfigList.map((config) => (
    <DropDown key={config.buttonText} config={config} />
  ));

  return <TableFilterButtonsBox>{filterDropDownList}</TableFilterButtonsBox>;
};

export default TableFilterButtons;

const TableFilterButtonsBox = styled.div`
  display: flex;
  gap: 36px;

  color: ${({ theme }) => theme.color.neutralTextWeak};
`;
