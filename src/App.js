import React from "react";
import Router from "./routes";
import { AuthProvider, AuthContext } from "./contexts/Auth";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";




import Sidebar from "./components/Sidebar"
import Client from "./pages/Client/Client";
function App() {
  return (
    // <AuthProvider>
    //   <Router />
    // </AuthProvider>
    <Sidebar/>
  )
}

export default App;
