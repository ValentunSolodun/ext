import {createTheme} from '@mui/material';

export const theme = createTheme({
  typography: {},
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 20,
        },
        containedSecondary: {
          color: '#fff'
        },
      }
    }
  },
  palette: {
    primary: {
      main: '#cb5211',
    },
    secondary: {
      main: '#11cb5f',
    },
  },
});
