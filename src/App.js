import { Route, Routes, } from "react-router-dom";
import './App.css';
import UserRoutes from './Routes/UserRoutes';
import AdminRoutes from './Routes/AdminRoutes';
import PrivateRoute from "./User/containers/PrivateRoute";
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react'
import { ThemeProvider } from "./Context/ThemeContext";
import { persistor, store } from "./Redux/Store";
import Alert from "./User/components/Alert/Alert";
import { SnackbarProvider } from "notistack";

function App() {
  // const { store, persistor } = configStore();
  return (
    <SnackbarProvider maxSnack={3}>
    <Provider store={store}>
      <ThemeProvider>
        <PersistGate loading={null} persistor={persistor}>
          <Alert/>
          <Routes>
            <Route path='/*' element={<UserRoutes />} />
            <Route element={<PrivateRoute />}>
              <Route path='/admin/*' element={<AdminRoutes />} />
            </Route>
          </Routes>
        </PersistGate>
      </ThemeProvider>
    </Provider>
    </SnackbarProvider>
  );
}

export default App;
