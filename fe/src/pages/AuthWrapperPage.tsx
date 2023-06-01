import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface AuthWrapperPageProps {
  children: React.ReactNode;
}

const AuthWrapperPage = (props: AuthWrapperPageProps) => {
  const { children } = props;
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogin) {
      navigate('/login');
    }
  }, [isLogin]);
  return <>{children}</>;
};

export default AuthWrapperPage;
