import React, { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';
import { BASE_API } from '../api';

const Auth = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const url = new URL(window.location.href);
    const code = url.searchParams.get('code');
    const getDatas = async () => {
      const response = await fetch(`${BASE_API}oauth/login?code=${code}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      if (response.ok)
        await localStorage.setItem('token', JSON.stringify(data));
      if (await localStorage.getItem('token')) {
        navigate('/');
      }
    };
    getDatas();
  });

  return <div>로딩이래요</div>;
};

export default Auth;
