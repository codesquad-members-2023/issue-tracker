import { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import GlobalStyles from './style/GlobalStyles';
import { darkTheme, lightTheme } from './style';
import IssueList from './pages/IssueList';
import AddIssue from './pages/AddIssue';
import { PageLayout } from './components/common';
import IssueDetail from './pages/IssueDetail';
import MainPageStateProvider from './context/MainPage/MainPageStateContext';
import MainPageFilterProvider from './context/MainPage/MainPageFilterContext';

const router = createBrowserRouter([
  {
    path: '/',
    element: <PageLayout />,
    children: [
      {
        index: true,
        element: (
          <MainPageStateProvider>
            <MainPageFilterProvider>
              <IssueList />
            </MainPageFilterProvider>
          </MainPageStateProvider>
        ),
      },
      { path: '/add-issue', element: <AddIssue /> },
      { path: '/issue-detail/:issuenumber', element: <IssueDetail /> },
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
