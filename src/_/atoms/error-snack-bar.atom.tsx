import React from 'react';

import Snackbar from '@material-ui/core/Snackbar';
import { Alert } from '@material-ui/lab';

interface ErrorProps {
  state: boolean;
  setState: React.Dispatch<React.SetStateAction<boolean>>;
}

const ErrorSnackBar: React.FC<ErrorProps> = ({ state, setState }) => {
  const handleClose = () => {
    setState(false);
  };

  return (
    <Snackbar open={state} autoHideDuration={3000} onClose={handleClose}>
      <Alert severity="error">Something went wrong, Please try again or contact System Administrator</Alert>
    </Snackbar>
  );
};

export default ErrorSnackBar;
