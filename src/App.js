import React from "react";
import Router from "./routes";
import { AuthProvider, AuthContext } from "./contexts/Auth";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import ClientSwitch from "./routes/ClientSwitch"
import AdminSwitch from "./routes/AdminSwitch"
import StationBill from "./pages/Station/StationBill"
function App() {
  return (
    // <AuthProvider>
    //   <Router />
    // </AuthProvider>
    <StationBill/>
  )
}

export default App;
