import './App.css';
import {Route, Routes} from 'react-router-dom';
import Home from './views/Home/home.component';
import Detail from './views/Detail/Detail.component';
import Create from './views/Create/Create.component';
import Landing from './views/Landing/Landing.component';
import Nav from './components/Nav/Nav.components';

function App() {
  return (
    <div className="App">
      <Nav/>
      <Routes>
        <Route exact path='/' element = {<Landing/>}/>
        <Route exact path='/home' element={<Home/>}/>
        <Route path='/detail/:id/:origin' element={<Detail/>}/>
        <Route path='/create' element={<Create/>}/>  
      </Routes>
      
    </div>
  );
}

export default App;
