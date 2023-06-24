import logo from './logo.svg';
import { Route, Routes, } from "react-router-dom";

import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './containers/Home';
import Departments from './containers/Departments';
import Doctors from './containers/Doctors';
import About from './containers/About';
import Contact from './containers/Contact';
import Appointment from './containers/Appointment';
import Docdescription from './containers/Docdescription';
import VisitingDoctor from './containers/VisitingDoctor';
import NotFound from './components/NotFound';
import Auth from './containers/Auth';
import Auth1 from './containers/Auth1';
import Contact1 from './containers/Contact1';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/Departments' element={<Departments />} />
        <Route path='/Doctors' element={<Doctors />} />
        <Route path='/About' element={<About />} />
        {/* <Route path='/Contact' element={<Contact />} /> */}
        <Route path='/Contact' element={<Contact1 />} />
        <Route path='/Appointment' element={<Appointment />} />
        {/* <Route path='/Doctordescrip/:id' element={<Docdescription/>}/>      
        <Route path='/Doctordescrip/Visiting' element={<VisitingDoctor/>}/>       */}

        <Route path='/Doctordescrip/'>
          <Route path=':id' element={<Docdescription />} />
          <Route path='Visiting' element={<VisitingDoctor />} />
        </Route>

        <Route path='*' element={<NotFound />} />
        {/* <Route path='/Auth' element={<Auth />} /> */}
        <Route path='/Auth1' element={<Auth1 />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
