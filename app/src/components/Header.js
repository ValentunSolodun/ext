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
import Typography from '@material-ui/core/Typography';
import {MAIN_BACKGROUND, PRIMARY_COLOR} from "../const";
import Button from '../shared/src/components/Button';

const HeaderContainer = withStyles({
  root: {
    position: 'sticky',
    left: 0,
    top: 0,
    height: 70,
    width: '100%',
    background: MAIN_BACKGROUND,
    borderRadius: 0,
    zIndex: 1
  }
})(Paper);

const Header = () => {

  const {clear, addFilterByType, removeFilterByType, resourceTypes} = useNetworkLogs();
  const isXHR = _.includes(resourceTypes, 'xhr');

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
              <DeleteIcon style={{fill: PRIMARY_COLOR}}/>
            </IconButton>
          </Tooltip>
        </Grid>
        <Grid item style={{marginRight: 20}}>
          <FormGroup>
            <FormControlLabel control={<Switch defaultChecked checked={isXHR} onChange={handleToggleFilter('xhr')}/>}
                              label={<Typography color='primary' variant='caption'>Fetch/XHR</Typography>}/>
          </FormGroup>
        </Grid>
        <Button />
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
