import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import InitialLogin from './Components/InitialLogin';
import Otp from './Components/Otp'
import Home from './Components/Home'
import ReturningUserLogIn from './Components/returningUserLogIn';

function App() {

return(
  <Routes>
  <Route path="/" element={<InitialLogin/>}></Route>
  <Route path="/Otp" element={<Otp/>}></Route>
  <Route path="/home" element={<Home/>}></Route>
  <Route path="/returningUser" element={<ReturningUserLogIn/>}></Route>
</Routes>
)


}

export default App;
