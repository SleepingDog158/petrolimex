import React from "react";
import Router from "./routes";
import AuthProvider, { AuthContext } from "./contexts/Auth";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";

import { CookiesProvider } from "react-cookie";

function App() {
  return (
    <CookiesProvider>
      <AuthProvider>
        <Router />
      </AuthProvider>
    </CookiesProvider>
    // <StationSwitch />
  );
}

export default App;
