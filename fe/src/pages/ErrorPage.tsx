import React from 'react';
import { useRouteError } from 'react-router-dom';

// FIXME(Jayden): error type 및 page 스타일링
const ErrorPage = () => {
  const error: any = useRouteError();
  console.error(error);

  return (
    <div id="error-page">
      <h1>앗!</h1>
      <p>에러가 발생하였습니다!</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
};

export default ErrorPage;
