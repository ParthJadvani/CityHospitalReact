import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

function PrivateRoute() {
    // let localdata = localStorage.getItem('loginstatus');
    const authData = useSelector((state) => state.auth);
    return (
        authData.user ? <Outlet/> : <Navigate to="/Auth1" replace/>
    );
}

export default PrivateRoute;