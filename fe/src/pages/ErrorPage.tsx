import React from 'react';
import { useRouteError } from 'react-router-dom';

// FIXME(Jayden): error type 및 page 스타일링
const ErrorPage = () => {
  const error: any = useRouteError();

  // 404: 존재하지 않는 url을 요청하는 경우
  if (error.status === 404) {
    return <div>🙈 앗, 존재하지 않는 페이지에요!</div>;
  }
  // 401: 요청한 리소스에 대한 인증이 필요한 경우
  if (error.status === 401) {
    return <div>🙊 인증이 필요한 서비스에요!</div>;
  }
  // 503: 오리진 서버의 성능 문제(서버가 현재 요청을 처리할 수 없는 경우)
  if (error.status === 503) {
    return (
      <div>
        🙉 서버가 다운되었었어요. 현재 열심히 고치고 있어요! 잠시만
        기다려주세요!
      </div>
    );
  }

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
