import React from "react";
import Router from "./routes";
import { AuthProvider, AuthContext } from "./contexts/Auth";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";

import GasPriceTable from "./components/GasPriceTable"
import AdminProduct from "./pages/Admin/AdminProduct"
import NavBar from "./components/NavBar"
import Sidebar from "./components/Sidebar"
import Client from "./pages/Client/Client-Main";
function App() {
  return (
    // <AuthProvider>
    //   <Router />
    // </AuthProvider>
    <AdminProduct/>
  )
}

export default App;
