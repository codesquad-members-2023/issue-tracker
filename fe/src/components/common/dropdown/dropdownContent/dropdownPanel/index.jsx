import DropdownBody from '../dropdownBody';
import { DropdownPanelBlock, PanelHeaderBlock } from './style';

const DropdownPanel = ({
  buttonName,
  buttonId,
  content,
  filterState,
  filterClickHandler,
  dropdownStyle,
  onClick,
}) => {
  return (
    <DropdownPanelBlock dropdownStyle={dropdownStyle} onClick={onClick}>
      {dropdownStyle === 'filter' && <PanelHeaderBlock>{buttonName} 필터</PanelHeaderBlock>}
      <ul>
        {(buttonId === 'assignees' || buttonId === 'writers') &&
          content[buttonId]?.map(({ id, name, imgUrl }, _, array) => {
            const isChecked = filterState[buttonId] === id;
            const isOnlyChild = array.length === 1;
            return (
              <DropdownBody
                buttonId={buttonId}
                key={id}
                id={id}
                isChecked={isChecked}
                name={name}
                imgUrl={imgUrl}
                filterClickHandler={filterClickHandler}
                isOnlyChild={isOnlyChild}
              />
            );
          })}
        {buttonId === 'labels' &&
          content[buttonId]?.map(({ id, title, bgColorCode }, _, array) => {
            const isChecked = filterState[buttonId] === id;
            const isOnlyChild = array.length === 1;
            return (
              <DropdownBody
                buttonId={buttonId}
                key={id}
                id={id}
                title={title}
                isChecked={isChecked}
                bgColorCode={bgColorCode}
                filterClickHandler={filterClickHandler}
                isOnlyChild={isOnlyChild}
              />
            );
          })}
        {buttonId === 'milestones' &&
          content[buttonId]?.map(({ id, title }, _, array) => {
            const isChecked = filterState[buttonId] === id;
            const isOnlyChild = array.length === 1;
            return (
              <DropdownBody
                buttonId={buttonId}
                key={id}
                id={id}
                title={title}
                isChecked={isChecked}
                filterClickHandler={filterClickHandler}
                isOnlyChild={isOnlyChild}
              />
            );
          })}
      </ul>
    </DropdownPanelBlock>
  );
};

export default DropdownPanel;
