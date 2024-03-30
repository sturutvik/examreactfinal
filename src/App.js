
import './App.css';
import Productfrom from './componet/Productfrom';
import Productlist from './componet/Productlist';
import { Route, Routes } from 'react-router-dom';
import Navbarcomoponet from './componet/Navbarcomoponet';

function App() {
  return (
    <div className="App">

     <Navbarcomoponet/>
       
        <Routes>
          <Route  path ='/productfrom' element={ < Productfrom/>} />
          <Route  path ='/productlist' element={ <Productlist/>} />
        </Routes>
 
    </div>
  );
}


export default App;
