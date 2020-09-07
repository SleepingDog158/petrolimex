import React from "react";
import Router from "./routes";
import { AuthProvider, AuthContext } from "./contexts/Auth";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import AdminStation from "./pages/Admin/AdminStation";
import ClientContract from "./pages/Client/ClientContract"

function App() {
  return (
    // <AuthProvider>
    //  <Router />
    // </AuthProvider>
    <AdminStation/>
    //<ClientContract/>
  )
}

export default App;
