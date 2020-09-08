import React from "react";
import Router from "./routes";
import { AuthProvider, AuthContext } from "./contexts/Auth";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import ClientSwitch from "./routes/ClientSwitch"

function App() {
  return (
    // <AuthProvider>
    //   <Router />
    // </AuthProvider>
     <ClientSwitch/>
  )
}

export default App;
