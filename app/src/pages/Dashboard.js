import React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import {withStyles} from '@material-ui/styles';
import {useNetworkLogs} from '../contexts/useNetworkLogs';
import _ from 'lodash';
import syntaxHighlight from '../helpers';
import Pre from "../components/Pre";
import Header from "../components/Header";
import {MAX_LOGS_TO_RENDER, PRIMARY_COLOR} from "../const";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const PaperContainer = withStyles({
  root: {
    padding: 10
  }
})(Paper);

const middlewareRenderLogs = (logs) => {
  return logs.slice(-MAX_LOGS_TO_RENDER);
};

const Dashboard = () => {

  const {logs} = useNetworkLogs();
  console.log(logs);

  return (
    <Grid container xs={12}>
      <Header/>
      <Grid item container xs={12} style={{padding: 20}} spacing={2}>
        {
          _.map(middlewareRenderLogs(logs), l => {
            const connection = _.get(l, 'connection');
            return (
              <XHRItem key={connection} log={l}/>
            )
          })
        }
      </Grid>
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

  if (mimeType.indexOf('application/json') !== -1) {
    postData = JSON.parse(_.get(log, 'request.postData.text', "{}"));
  }

  return (
    <Grid item xs={12}>
      <Accordion TransitionProps={{unmountOnExit: true}}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon style={{fill: PRIMARY_COLOR}}/>}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          {/*<Grid container item xs={12}>*/}
          {/*  <Grid item xs={12}>*/}
          {/*    <Typography color='primary' variant='body1'><b>METHOD:</b> {method}</Typography>*/}
          {/*  </Grid>*/}
          {/*</Grid>*/}
          <Grid container xs={12}>
            <Grid item xs={12}>
              <Typography color='primary' variant='body1'><b>({method}:{status}) URL:</b> {url}</Typography>
            </Grid>
          </Grid>
          {/*<Grid container xs={12}>*/}
          {/*  <Grid item xs={12}>*/}
          {/*    <Typography color='primary' variant='body1'><b>STATUS:</b> {status}</Typography>*/}
          {/*  </Grid>*/}
          {/*</Grid>*/}
        </AccordionSummary>
        <AccordionDetails>
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
        </AccordionDetails>
      </Accordion>
    </Grid>
  )

  // return (
  //   <Grid item xs={12}>
  //     <PaperContainer>
  //       <Grid container item xs={12}>
  //         <Grid item xs={12}>
  //           <Typography color='primary' variant='body1'><b>METHOD:</b> {method}</Typography>
  //         </Grid>
  //       </Grid>
  //       <Grid container xs={12}>
  //         <Grid item xs={12}>
  //           <Typography color='primary' variant='body1'><b>URL:</b> {url}</Typography>
  //         </Grid>
  //       </Grid>
  //       <Grid container xs={12}>
  //         <Grid item xs={12}>
  //           <Typography color='primary' variant='body1'><b>STATUS:</b> {status}</Typography>
  //         </Grid>
  //       </Grid>
  //       {
  //         !!!_.isEmpty(postData) && (
  //           <Grid container xs={12}>
  //             <Grid item xs={12}>
  //               <Typography color='primary' variant='body1'><b>REQUEST DATA:</b></Typography>
  //             </Grid>
  //             <Grid item xs={12}>
  //               <Pre dangerouslySetInnerHTML={{__html: syntaxHighlight(postData)}}/>
  //             </Grid>
  //           </Grid>
  //         )
  //       }
  //       <Grid container xs={12}>
  //         <Grid item xs={12}>
  //           <Typography color='primary' variant='body1'><b>RESPONSE DATA:</b></Typography>
  //         </Grid>
  //         <Grid item xs={12}>
  //           <Pre dangerouslySetInnerHTML={{__html: syntaxHighlight(responseBody)}}/>
  //         </Grid>
  //       </Grid>
  //     </PaperContainer>
  //   </Grid>
  // )
};

export default Dashboard;