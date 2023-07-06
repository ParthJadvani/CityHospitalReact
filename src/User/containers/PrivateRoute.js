import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

function PrivateRoute() {
    let log = {'isAuthenticate' : false}
    return (
        log.isAuthenticate ? <Outlet/> : <Navigate to="/Auth1"/>
    );
}

export default PrivateRoute;