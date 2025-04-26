import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Start from './Pages/Start';
import Home from './Pages/Home';
import UserLogin from './Pages/userLogin';
import UserSignUp from './Pages/userSignUp'; 
import UserProtectedWrapper from './Pages/userProtectedWrapper';

const App = () => {

  return (
    <Routes>
      <Route path="/" element={<Start />} />
      <Route path="/login" element={<UserLogin />} />
      <Route path="/signup" element={<UserSignUp />} />
      <Route path="/home" element={ 
        <UserProtectedWrapper>
          <Home />
        </UserProtectedWrapper>
      } />
    </Routes>
  );
};

export default App;