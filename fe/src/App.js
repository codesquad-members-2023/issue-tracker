import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './components/common/header/Header';
import MainPage from './pages/MainPage';
import AddIssuePage from './pages/AddIssuePage';

const App = () => {
  return (
    <React.Fragment>
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/addIssue" element={<AddIssuePage />} />
      </Routes>
    </React.Fragment>
  );
};

export default App;
