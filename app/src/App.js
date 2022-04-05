import './App.css';
import React from "react";
import {ThemeProvider} from "@mui/material";
import {theme} from './configs';
import Dashboard from './pages/Dashboard';
import NetworkLogsProvider from "./contexts/useNetworkLogs";

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <NetworkLogsProvider>
          <Dashboard/>
        </NetworkLogsProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
