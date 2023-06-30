import React from 'react';
import LayoutMUI from '../Admin/components/LayoutMUI';
import AddDoctor from '../Admin/containers/AddDoctor';
import AddMedicine from '../Admin/containers/AddMedi';
import AddAppointment from '../Admin/containers/AddAppointment';
import { Route, Routes } from 'react-router-dom';

function AdminRoutes(props) {
    return (
        <LayoutMUI>
            <Routes>
                <Route path='/doctor' element={<AddDoctor />} />
                <Route path='/medicine' element={<AddMedicine />} />
                <Route path='/appointment' element={<AddAppointment />} />
            </Routes>
        </LayoutMUI>
    );
}

export default AdminRoutes;