import './App.css';
import React from "react";
import {ThemeProvider} from "@mui/material";
import {theme} from './configs';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Dashboard/>
      </ThemeProvider>
    </div>
  );
}

export default App;
