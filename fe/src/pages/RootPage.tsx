import React from 'react';
import { Outlet } from 'react-router-dom';

import Header from '@components/Header/Header';

// FIXME(Jayden): 로그인 기능 구현 후, 로그인한 유저의 프로필 이미지로 변경
const TEMP_PROFILE_URL =
  'https://images.unsplash.com/photo-1546527868-ccb7ee7dfa6a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80';

const RootPage = () => {
  return (
    <div className="mx-10 my-[27px]">
      <Header url={TEMP_PROFILE_URL} />
      <Outlet />
    </div>
  );
};

export default RootPage;
