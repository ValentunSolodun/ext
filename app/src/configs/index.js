import {createTheme} from '@mui/material';

export const theme = createTheme({
  typography: {},
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          wordBreak: 'break-word'
        }
      }
    },
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
      main: '#4e4747',
    },
    secondary: {
      main: '#dadada',
    },
  },
});
