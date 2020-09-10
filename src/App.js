import React from "react";
import Router from "./routes";
import { AuthProvider, AuthContext } from "./contexts/Auth";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import ClientSwitch from "./routes/ClientSwitch"
import AdminSwitch from "./routes/AdminSwitch"

function App() {
  return (
    // <AuthProvider>
    //   <Router />
    // </AuthProvider>
    // <ClientSwitch/>
    <AdminSwitch/>
  )
}

export default App;
