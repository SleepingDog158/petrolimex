import React from "react";
import Router from "./routes";
import { AuthProvider, AuthContext } from "./contexts/Auth";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";

import GasPriceTable from "./components/GasPriceTable"
import AdminMain from "./pages/Admin/AdminMain"
import AdminProduct from "./pages/Admin/AdminProduct"
import NavBar from "./components/NavBar"
import Sidebar from "./components/Sidebar"
import LandingPage from './pages/LandingPage'
import AdminPartner from "./pages/Admin/AdminPartner"
import DriversList from './components/DriversList'
import ClientDriver from "./pages/Client/Client-Driver";
import ClientMain from "./pages/Client/Client-Main";
import AdminPartnerMain from "./pages/Admin/AdminPartnerMain";

function App() {
  return (
    // <AuthProvider>
    //   <Router />
    // </AuthProvider>
     //<ClientDriver/>
     <AdminPartnerMain/>
  )
}

export default App;
