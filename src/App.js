import React from "react";
import Router from "./routes";
import { AuthProvider, AuthContext } from "./contexts/Auth";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import LandingPage from './pages/LandingPage'
import AdminPartner from "./pages/Admin/AdminPartner"
import DriversList from './components/DriversList'
import ClientDriver from "./pages/Client/Client-Driver";
import ClientMain from "./pages/Client/Client-Main";
import ClientContract from "./pages/Client/ClientContract"
import ClientReport from "./pages/Client/ClientReport"
import ClientDeal from "./pages/Client/ClientDeal"
import {Filterbar} from "./components/FilterBar"

function App() {
  return (
    // <AuthProvider>
    //   <Router />
    // </AuthProvider>
     <ClientDeal/>
  )
}

export default App;
