import React from "react";
import Router from "./routes";
import { AuthProvider, AuthContext } from "./contexts/Auth";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";

import Admin from "./pages/Admin/Admin"
import NavBar from "./components/NavBar"
import Sidebar from "./components/Sidebar"
import Client from "./pages/Client/Client";
function App() {
  return (
    // <AuthProvider>
    //   <Router />
    // </AuthProvider>
    <Admin/>
  )
}

export default App;
