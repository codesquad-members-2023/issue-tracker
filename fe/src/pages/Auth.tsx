import React, { useEffect } from 'react';
import { BASE_API } from '../api';

const Auth = () => {
  useEffect(() => {
    const url = new URL(window.location.href);
    const code = url.searchParams.get('code');
    fetch(`${BASE_API}oauth/login?code=${code}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  });

  return <div>로딩이래요</div>;
};

export default Auth;
