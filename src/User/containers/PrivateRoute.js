import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

function PrivateRoute() {
    let localdata = localStorage.getItem('loginstatus');
    return (
        localdata ? <Outlet/> : <Navigate to="/Auth1" replace/>
    );
}

export default PrivateRoute;