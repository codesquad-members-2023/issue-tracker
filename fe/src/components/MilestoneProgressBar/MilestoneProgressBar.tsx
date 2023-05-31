import React from 'react';

interface MilestoneProgressBarProps {
  progress: number;
}

const MilestoneProgressBar = (props: MilestoneProgressBarProps) => {
  const { progress } = props;
  return (
    <div className="relative h-2 w-full rounded-2xl bg-gray-200">
      <div
        className="absolute left-0 top-0 h-full rounded-2xl bg-blue"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

export default MilestoneProgressBar;
