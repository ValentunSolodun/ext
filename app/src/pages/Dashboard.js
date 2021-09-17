import React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import {withStyles} from '@material-ui/styles';
import {useNetworkLogs} from '../hooks';
import _ from 'lodash';
import syntaxHighlight from '../helpers';
import Pre from "../components/Pre";

const PaperContainer = withStyles({
  root: {
    padding: 10
  }
})(Paper);

const Dashboard = () => {

  const logs = useNetworkLogs();
  console.log(logs);
  return (
    <Grid container style={{padding: 20}} spacing={2}>
      {
        _.map(logs, l => {
          const connection = _.get(l, 'connection');
          return (
            <XHRItem key={connection} log={l}/>
          )
        })
      }
    </Grid>
  );
};

const XHRItem = (props) => {
  const {log} = props;

  const method = _.get(log, 'request.method');
  const url = _.get(log, 'request.url');
  const status = _.get(log, 'response.status');
  const responseBody = _.get(log, 'responseBody');
  const mimeType = _.get(log, 'request.postData.mimeType', '');
  let postData = '';

  if(mimeType.indexOf('application/json') !== -1) {
    postData = JSON.parse(_.get(log, 'request.postData.text', "{}"));
  }

  return (
    <Grid item xs={12}>
      <PaperContainer>
        <Grid container item xs={12}>
          <Grid item xs={12}>
            <Typography color='primary' variant='body1'><b>METHOD:</b> {method}</Typography>
          </Grid>
        </Grid>
        <Grid container xs={12}>
          <Grid item xs={12}>
            <Typography color='primary' variant='body1'><b>URL:</b> {url}</Typography>
          </Grid>
        </Grid>
        <Grid container xs={12}>
          <Grid item xs={12}>
            <Typography color='primary' variant='body1'><b>STATUS:</b> {status}</Typography>
          </Grid>
        </Grid>
        {
          !!!_.isEmpty(postData) && (
            <Grid container xs={12}>
              <Grid item xs={12}>
                <Typography color='primary' variant='body1'><b>REQUEST DATA:</b></Typography>
              </Grid>
              <Grid item xs={12}>
                <Pre dangerouslySetInnerHTML={{__html: syntaxHighlight(postData)}}/>
              </Grid>
            </Grid>
          )
        }
        <Grid container xs={12}>
          <Grid item xs={12}>
            <Typography color='primary' variant='body1'><b>RESPONSE DATA:</b></Typography>
          </Grid>
          <Grid item xs={12}>
            <Pre dangerouslySetInnerHTML={{__html: syntaxHighlight(responseBody)}}/>
          </Grid>
        </Grid>
      </PaperContainer>
    </Grid>
  )
};

export default Dashboard;