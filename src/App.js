import React from "react";
import Router from "./routes";
import { AuthProvider, AuthContext } from "./contexts/Auth";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import ClientSwitch from "./routes/ClientSwitch"
import AdminSwitch from "./routes/AdminSwitch"
import StationSwitch from "./routes/StationSwitch"
import {BillCreate} from "./components/BillCreate"
function App() {
  return (
    // <AuthProvider>
    //   <Router />
    // </AuthProvider>
    //<StationBill/>
    <AdminSwitch/>
  )
}

export default App;
