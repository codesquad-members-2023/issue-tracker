import React from 'react';

import RootPage from './pages/RootPage';
import MainPage from './pages/MainPage';
import IssueDetailPage from './pages/IssueDetailPage';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorPage from './pages/ErrorPage';

// NOTE(Jayden): React Router 설정
const router = createBrowserRouter([
  {
    path: '/',
    element: <RootPage />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <MainPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: '/issues/:issueId',
        element: <IssueDetailPage />,
        errorElement: <ErrorPage />,
      },
    ],
  },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
