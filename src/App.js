import { Route, Routes, } from "react-router-dom";
import './App.css';
import UserRoutes from './Routes/UserRoutes';
import AdminRoutes from './Routes/AdminRoutes';
import PrivateRoute from "./User/containers/PrivateRoute";
import { Provider } from "react-redux";
import { configStore } from "./Redux/Store";
import { PersistGate } from 'redux-persist/integration/react'

function App() {
  const {store, persistor} = configStore();
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Routes>
          <Route path='/*' element={<UserRoutes />} />

          <Route element={<PrivateRoute />}>
            <Route path='/admin/*' element={<AdminRoutes />} />
          </Route>
        </Routes>
      </PersistGate>
    </Provider>
  );
}

export default App;
