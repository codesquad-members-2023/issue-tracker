import { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import GlobalStyles from './style/GlobalStyles';
import { darkTheme, lightTheme } from './style';
import IssueList from './pages/IssueList';
import AddIssue from './pages/AddIssue';
import { PageLayout } from './components/common';
import MainPageProvider from './context/MainPage/MainPageContext';
import IssueDetail from './pages/IssueDetail';

const router = createBrowserRouter([
  {
    path: '/',
    element: <PageLayout />,
    children: [
      {
        index: true,
        element: (
          <MainPageProvider>
            <IssueList />
          </MainPageProvider>
        ),
      },
      { path: '/add-issue', element: <AddIssue /> },
      { path: '/issue-detail', element: <IssueDetail /> },
    ],
  },
]);

const App = () => {
  const [theme, setTheme] = useState(lightTheme);

  return (
    <ThemeProvider
      theme={{
        ...theme,
        setTheme: () => {
          setTheme(theme.id === 'lightTheme' ? darkTheme : lightTheme);
        },
      }}
    >
      <GlobalStyles />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
};

export default App;
