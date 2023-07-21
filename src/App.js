import { Route, Routes, } from "react-router-dom";
import './App.css';
import UserRoutes from './Routes/UserRoutes';
import AdminRoutes from './Routes/AdminRoutes';
import PrivateRoute from "./User/containers/PrivateRoute";
import { Provider } from "react-redux";
import { configStore } from "./Redux/Store";

function App() {
  const store = configStore();
  return (
    <Provider store={store}>
      <Routes>
        <Route path='/*' element={<UserRoutes />} />

        <Route element={<PrivateRoute />}>
          <Route path='/admin/*' element={<AdminRoutes />} />
        </Route>
      </Routes>
    </Provider>
  );
}

export default App;
