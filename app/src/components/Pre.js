import React from "react";
import {makeStyles} from '@material-ui/styles';

const useStyles = makeStyles({
  root: {
    borderRadius: 15,
    outline: 'none',
    border: '1px solid #dadada',
    padding: 10,
    margin: 5,
    fontSize: 14
  }
});


const MyComponent = ({children, ...props}) => {
  const styles = useStyles();

  return (
    <pre className={styles.root} {...props}>
      {children}
    </pre>
  );
};

export default MyComponent;
