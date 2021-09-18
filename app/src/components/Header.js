import React from 'react';
import Grid from "@material-ui/core/Grid";
import {withStyles} from "@material-ui/styles";
import {useNetworkLogs} from "../contexts/useNetworkLogs";
import Paper from '@mui/material/Paper';
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from '@mui/icons-material/Delete';
import Tooltip from "@material-ui/core/Tooltip";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import _ from 'lodash';
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import FormControl from "@material-ui/core/FormControl";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from '@mui/icons-material/Search';

const HeaderContainer = withStyles({
  root: {
    position: 'sticky',
    left: 0,
    top: 0,
    height: 70,
    width: '100%',
    // background: 'red',
    borderRadius: 0
  }
})(Paper);

const Header = () => {

  const {clear, addFilterByType, removeFilterByType} = useNetworkLogs();

  const handleToggleFilter = (type) => (e) => {
    const checked = _.get(e, 'target.checked');
    if (checked) addFilterByType(type);
    else removeFilterByType(type);
  };

  return (
    <HeaderContainer elevation={3}>
      <Grid container alignItems="center" style={{height: '100%', padding: '0 20px'}}>
        <Grid item style={{marginRight: 20}}>
          <Tooltip title="Clear all">
            <IconButton aria-label="delete" onClick={clear}>
              <DeleteIcon/>
            </IconButton>
          </Tooltip>
        </Grid>
        <Grid item style={{marginRight: 20}}>
          <FormGroup>
            <FormControlLabel control={<Switch defaultChecked onChange={handleToggleFilter('xhr')}/>}
                              label="Fetch/XHR"/>
          </FormGroup>
        </Grid>
        {/*<Grid item container alignItems="center" xs>*/}
        {/*  <Grid item>*/}
        {/*    <FormControl variant="standard">*/}
        {/*      <InputLabel htmlFor="standard-adornment-password">Search</InputLabel>*/}
        {/*      <Input*/}
        {/*        id="standard-adornment-password"*/}
        {/*        type='text'*/}
        {/*      />*/}
        {/*    </FormControl>*/}
        {/*  </Grid>*/}
        {/*  <Grid item>*/}
        {/*    <IconButton aria-label="delete" onClick={clear}>*/}
        {/*      <SearchIcon/>*/}
        {/*    </IconButton>*/}
        {/*  </Grid>*/}
        {/*</Grid>*/}
      </Grid>
    </HeaderContainer>
  );
};

export default Header;
