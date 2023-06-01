import React from 'react';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootPage from './pages/RootPage';
import MainPage from './pages/MainPage';
import IssueDetailPage from './pages/IssueDetailPage';
import LabelPage from './pages/LabelPage';
import MilestonePage from './pages/MilestonePage';
import ErrorPage from './pages/ErrorPage';
import NewIssue from './pages/NewIssue';
import LoginPage from './pages/LoginPage';
import AuthWrapperPage from './pages/AuthWrapperPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <AuthWrapperPage>
        <RootPage />
      </AuthWrapperPage>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <MainPage />,
      },
      {
        path: '/issues/:issueId',
        element: <IssueDetailPage />,
      },
      { path: '/new-issue', element: <NewIssue /> },
      { path: '/labels', element: <LabelPage /> },
      { path: '/milestones', element: <MilestonePage /> },
    ],
  },
  { path: '/login', element: <LoginPage />, errorElement: <ErrorPage /> },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
