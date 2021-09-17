import './App.css';
import React from "react";
import {createTheme, ThemeProvider} from "@mui/material";
import Button from "./components/Button";

const theme = createTheme({
  palette: {
    primary: {
      main: '#cb5211',
    },
    secondary: {
      main: '#11cb5f',
    },
  },
});

function App() {
  return (
    <div className="App">
        <Button color='primary' variant='outlined'>Test button</Button>
    </div>
  );
}

export default App;
