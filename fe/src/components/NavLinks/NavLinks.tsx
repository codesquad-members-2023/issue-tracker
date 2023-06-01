import React from 'react';

import Button from '@common/Button';
import { Link } from 'react-router-dom';

interface Props {
  countAllLabels: number;
  countAllMilestones: number;
  isLabelPage?: boolean;
  isMilestonesPage?: boolean;
}

const NavLinks: React.FC<Props> = ({
  countAllLabels,
  countAllMilestones,
  isLabelPage = false,
  isMilestonesPage = false,
}) => {
  return (
    <div className="flex h-10 w-80 rounded-2xl border border-gray-300">
      <Link
        to="/labels"
        className="flex w-1/2 justify-center border-r border-gray-300"
      >
        <Button
          title={`레이블(${countAllLabels || 0})`}
          onClick={() => null}
          size="Small"
          color="Gray"
          type="Ghost"
          iconName="label"
          condition={isLabelPage ? 'Enabled' : 'Press'}
        />
      </Link>
      <Link to="/milestones" className="flex w-1/2 justify-center">
        <Button
          title={`마일스톤(${countAllMilestones || 0})`}
          onClick={() => null}
          size="Small"
          color="Gray"
          type="Ghost"
          iconName="milestone"
          condition={isMilestonesPage ? 'Enabled' : 'Press'}
        />
      </Link>
    </div>
  );
};

export default NavLinks;
