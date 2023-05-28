import React from 'react';
import { Link } from 'react-router-dom';

import Logo from '@common/Logo';
import Profile from '@common/Profile';

interface Props {
  url: string;
}

const Header: React.FC<Props> = ({ url }) => {
  return (
    <header className="mb-[59px] flex items-center justify-between">
      <Link to={'/'} className="h-fit">
        <Logo size="Medium" />
      </Link>
      <Profile url={url} />
    </header>
  );
};

export default Header;
