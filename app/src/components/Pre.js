import React from "react";
import {makeStyles} from '@material-ui/styles';
import {PRIMARY_COLOR} from "../const";

const useStyles = makeStyles({
  root: {
    borderRadius: 4,
    outline: 'none',
    border: `1px solid ${PRIMARY_COLOR}`,
    color: PRIMARY_COLOR,
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
