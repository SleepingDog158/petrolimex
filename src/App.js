import React from "react";
import Router from "./routes";
import { AuthProvider, AuthContext } from "./contexts/Auth";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import ClientSwitch from "./routes/ClientSwitch"
import StationMain from "./pages/Station/StationMain"
function App() {
  return (
    <AuthProvider>
      <Router />
    </AuthProvider>
    //  <ClientSwitch/>
  )
}

export default App;
