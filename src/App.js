import React from "react";
import Router from "./routes";
import { AuthProvider, AuthContext } from "./contexts/Auth";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
<<<<<<< HEAD

import GasPriceTable from "./components/GasPriceTable"
import AdminProduct from "./pages/Admin/AdminProduct"
import NavBar from "./components/NavBar"
import Sidebar from "./components/Sidebar"
=======
import LandingPage from './pages/LandingPage'
import AdminPartner from "./pages/Admin/AdminPartner"
import DriversList from './components/DriversList'
import ClientDriver from "./pages/Client/Client-Driver";
>>>>>>> 396ef1a771d5c199acdd18c6f0d6e3542113eed2
import Client from "./pages/Client/Client-Main";
function App() {
  return (
    // <AuthProvider>
    //   <Router />
    // </AuthProvider>
<<<<<<< HEAD
    <AdminProduct/>
=======
     <ClientDriver/>
>>>>>>> 396ef1a771d5c199acdd18c6f0d6e3542113eed2
  )
}

export default App;
