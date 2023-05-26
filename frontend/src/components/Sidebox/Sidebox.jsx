import classNames from 'classnames/bind';
import styles from './Sidebox.module.css';
import { SideboxElement } from './SideboxElement/SideboxElement';
import { useEffect, useState } from 'react';
import { getMember } from '@services/member';
import { getLabel } from '@services/label';
import { getMilestone } from '@services/milestone';
import { convertListToOptions } from '@services/dropdown';

const cx = classNames.bind(styles);

export const Sidebox = ({
  selectedAssigneeState,
  selectedLabelState,
  selectedMilstoneState,
}) => {
  const sideboxClassNames = `${cx('sidebox')}`;
  const dropdownDatas = [
    {
      name: '담당자',
      id: 'assignee',
      selectedState: selectedAssigneeState,
    },
    {
      name: '레이블',
      id: 'label',
      selectedState: selectedLabelState,
    },
    {
      name: '마일스톤',
      id: 'milestone',
      selectedState: selectedMilstoneState,
    },
  ];

  return (
    <div className={sideboxClassNames}>
      {dropdownDatas.map((data, i) => (
        <SideboxElement
          style={{
            borderTop:
              i !== 0 ? '1px solid var(--color-light-neutral-border)' : 'none',
          }}
          key={data.name}
          {...data}
          selectedState={data.selectedState}
        ></SideboxElement>
      ))}
    </div>
  );
};
