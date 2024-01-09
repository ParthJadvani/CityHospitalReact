import React from 'react';
import LayoutMUI from '../Admin/components/LayoutMUI';
import AddMedicine from '../Admin/containers/Medicine/AddMedi';
import AddAppointment from '../Admin/containers/AddAppointment';
import { Route, Routes } from 'react-router-dom';
import Dashboard from '../Admin/containers/Dashboard';
import AddDoctor from '../Admin/containers/Doctors/AddDoctor';
import { Provider } from 'react-redux';
import { doctorStore } from '../Redux/Store';
import Department from '../Admin/containers/Department/Department';

function AdminRoutes(props) {
    // const store = doctorStore();
    return (
        <LayoutMUI>
            {/* <Provider store={store}> */}
                <Routes>
                    <Route path='/' element={<Dashboard />} />
                    <Route path='/doctor' element={<AddDoctor />} />
                    <Route path='/medicine' element={<AddMedicine />} />
                    <Route path='/appointment' element={<AddAppointment />} />
                    <Route path='/department' element={<Department />} />
                </Routes>
            {/* </Provider> */}
        </LayoutMUI>
    );
}

export default AdminRoutes;