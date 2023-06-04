import React, { useState } from 'react';

import Button from '@common/Button';
import MilestoneItem from '@components/MilestoneTable/MilestoneItem';

interface MilestoneTableProps {
  milestonesData: any;
  handleSetMilestoneData: () => void;
}

const MilestoneTable = (props: MilestoneTableProps) => {
  const { milestonesData, handleSetMilestoneData } = props;
  const [showOpenedMilestones, setShowOpenedMilestones] = useState(true);
  return (
    <section className="rounded-2xl border border-gray-300">
      <div className="flex h-16 items-center gap-x-6 rounded-t-2xl bg-gray-100 px-6 py-2 text-gray-600">
        <Button
          title={`열린 마일스톤(${milestonesData.countOpenedMilestones})`}
          onClick={() => setShowOpenedMilestones(true)}
          isFlexible={true}
          type="Ghost"
          condition={showOpenedMilestones ? 'Enabled' : 'Press'}
          color="Gray"
          size="Small"
          iconName="milestone"
        />
        <Button
          title={`닫힌 마일스톤(${milestonesData.countClosedMilestones})`}
          onClick={() => setShowOpenedMilestones(false)}
          isFlexible={true}
          type="Ghost"
          condition={showOpenedMilestones ? 'Press' : 'Enabled'}
          color="Gray"
          size="Small"
          iconName="archive"
        />
      </div>
      <ul className="rounded-b-2xl bg-gray-50">
        {milestonesData.milestoneList.map(
          (milestone: any) =>
            showOpenedMilestones === milestone.isOpen && (
              <MilestoneItem
                key={milestone.milestoneId}
                milestoneInfo={milestone}
                handleSetMilestoneData={handleSetMilestoneData}
              />
            )
        )}
      </ul>
    </section>
  );
};

export default MilestoneTable;
