import React, { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import Logo from '@common/Logo';
import Button from '@common/Button';

const LoginPage = () => {
  const [userLoginId, setUserLoginId] = useState('');
  const [userLoginPassword, setUserLoginPassword] = useState('');
  const LOGIN_URL =
    'https://github.com/login/oauth/authorize?client_id=cc0d42e5a617611e325a';
  const handleLogin = () => {
    window.location.href = LOGIN_URL;
  };
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate('/');
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center gap-y-16 bg-gray-100 px-80 py-40">
      <Logo size="Large" />
      <div className="flex flex-col items-center justify-center gap-y-4 ">
        <Button
          title="GitHub 계정으로 로그인"
          onClick={() => {
            handleLogin();
          }}
          color="Gray"
          size="Large"
        />
        <p>or</p>
        <div className="flex h-14 w-80 items-center justify-start gap-x-6 rounded-2xl bg-gray-200 px-6 py-2 text-sm">
          <div className="whitespace-nowrap text-gray-600">아이디</div>
          <input
            type="text"
            className="w-full bg-gray-200 outline-none"
            value={userLoginId}
            onChange={e => setUserLoginId(e.target.value)}
          />
        </div>
        <div className="flex h-14 w-80 items-center justify-start gap-x-6 rounded-2xl bg-gray-200 px-6 py-2 text-sm">
          <div className="whitespace-nowrap text-gray-600">비밀번호</div>
          <input
            type="password"
            className="w-full bg-gray-200 outline-none"
            value={userLoginPassword}
            onChange={e => {
              setUserLoginPassword(e.target.value);
            }}
          />
        </div>
        <Button
          title="아이디로 로그인"
          onClick={() =>
            alert(
              '로그인 기능은 추가 예정입니다! 깃헙 계정으로 로그인 부탁드립니다! ✨'
            )
          }
          color="Blue"
          size="Large"
          condition={userLoginId && userLoginPassword ? 'Enabled' : 'Disabled'}
        />
        <Button
          title="회원가입"
          onClick={() => alert('회원가입 기능은 추가 예정입니다! ✨')}
          color="Gray"
          size="Small"
          iconName="plus"
          type="Ghost"
          condition="Press"
        />
      </div>
    </div>
  );
};

export default LoginPage;
