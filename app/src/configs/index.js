import {createTheme} from '@mui/material';
import {MAIN_BACKGROUND, PRIMARY_COLOR} from "../const";

export const theme = createTheme({
  typography: {
    body1: {
      fontSize: 13,
    },
  },
  components: {
    MuiAccordion: {
      styleOverrides: {
        root: {
          border: `1px solid ${PRIMARY_COLOR}`,
          background: MAIN_BACKGROUND
        }
      }
    },
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
          borderRadius: 5,
        },
        containedSecondary: {
          color: '#fff'
        },
      }
    }
  },
  palette: {
    primary: {
      main: PRIMARY_COLOR,
    },
    secondary: {
      main: '#dadada',
    },
  },
});
