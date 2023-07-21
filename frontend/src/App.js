import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom'

//importing pages and components
import Signup from './pages/Signup'
import Login from './pages/Login'
import Home from './pages/Home'
import NavBar from './components/NavBar';
import AllBooks from './pages/AllBooks';
import AvailableBooks from './pages/AvailableBooks';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar/>
        <div className='pages'>
          <Routes>
          <Route path='/' element={<Home />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/login' element={<Login />} />
            <Route path='/allbooks' element={<AllBooks />} />
            <Route path='/available' element={<AvailableBooks />} />
            <Route path='/reserve' element={<Reseves />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
