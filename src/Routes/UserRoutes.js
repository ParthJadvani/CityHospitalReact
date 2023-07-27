import React from 'react';
import Header from '../User/components/Header';
import Footer from '../User/components/Footer';
import Home from '../User/containers/Home';
import Departments from '../User/containers/Departments';
import Doctors from '../User/containers/Doctors';
import About from '../User/containers/About';
import Appointment from '../User/containers/Appointment';
import Docdescription from '../User/containers/Docdescription';
import VisitingDoctor from '../User/containers/VisitingDoctor';
import NotFound from '../User/components/NotFound';
import Auth1 from '../User/containers/Auth1';
import Contact1 from '../User/containers/Contact1';
import FullForm from '../User/containers/FullForm';
import { Route, Routes } from 'react-router-dom';
import Medicine from '../User/containers/Medicine/Medicine';
import PrivateRoute from '../User/containers/PrivateRoute';
import { Provider } from 'react-redux';
import { configStore } from '../Redux/Store';
import Counter from '../User/containers/Counter/Counter';
import Cart from '../User/containers/Cart/Cart';
import Medicine1 from '../User/containers/Medicine/Medicine1';


function UserRoutes(props) {
    // const store = configStore();
    return (
        <>
            <Header />
            <Routes>

                <Route path='/' element={<Home />} />
                <Route path='/Departments' element={<Departments />} />
                <Route path='/Doctors' element={<Doctors />} />
                <Route path='/About' element={<About />} />
                <Route path='/Contact1' element={<Contact1 />} />
                <Route path='/Fullform' element={<FullForm />} />
                <Route path='/Appointment' element={<Appointment />} />
                <Route path='/Counter' element={<Counter />} />
                <Route path='/cart' element={<Cart />} />

                <Route element={<PrivateRoute />}>
                    {/* <Route path='/Medicine' element={<Medicine />} /> */}
                    <Route path='/Medicine' element={<Medicine1 />} />
                </Route>

                <Route path='/Doctordescrip/'>
                    <Route path=':id' element={<Docdescription />} />
                    <Route path='Visiting' element={<VisitingDoctor />} />
                </Route>

                <Route path='*' element={<NotFound />} />
                <Route path='/Auth1' element={<Auth1 />} />
            </Routes>
            <Footer />
        </>
    );
}

export default UserRoutes;