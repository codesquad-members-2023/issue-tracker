import React from 'react';

interface MilestoneProgressBarProps {
  progress: number;
}

const MilestoneProgressBar = (props: MilestoneProgressBarProps) => {
  const { progress } = props;
  return (
    <div className="relative h-2 w-full bg-gray-200">
      <div
        className={'absolute left-0 top-0 h-full bg-blue'}
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

export default MilestoneProgressBar;
