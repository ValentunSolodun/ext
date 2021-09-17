import { withStyles } from '@material-ui/styles';
import {Button} from "@mui/material";

export default withStyles({
  root: {
    borderRadius: 15,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 48,
  },
})(Button);