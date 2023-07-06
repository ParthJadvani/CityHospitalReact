import { Route, Routes, } from "react-router-dom";
import './App.css';
import UserRoutes from './Routes/UserRoutes';
import AdminRoutes from './Routes/AdminRoutes';
import PrivateRoute from "./User/containers/PrivateRoute";

function App() {
  return (
    <Routes>
      <Route path='/*' element={<UserRoutes />} />

      <Route element={<PrivateRoute/>}>
        <Route path='/admin/*' element={<AdminRoutes />} />
      </Route>
    </Routes>
  );
}

export default App;
