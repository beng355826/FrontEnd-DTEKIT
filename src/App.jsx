import { Routes, Route, BrowserRouter } from 'react-router-dom';
import InitialLogin from './Components/InitialLogin';
import Home from './Components/Home'
import BaseLayout from './Components/BaseLayout';
function App() {

return(
  
  <BaseLayout>
  <Routes>
  <Route path="/" element={<InitialLogin/>}></Route>
  <Route path="/home" element={<Home/>}></Route>
</Routes>
</BaseLayout>

)


}

export default App;
