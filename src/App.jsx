import { Routes, Route, BrowserRouter } from 'react-router-dom';
import InitialLogin from './Components/InitialLogin';

import Home from './Components/Home'


function App() {

return(
  <Routes>
  <Route path="/" element={<InitialLogin/>}></Route>
  <Route path="/home" element={<Home/>}></Route>
</Routes>
)


}

export default App;
