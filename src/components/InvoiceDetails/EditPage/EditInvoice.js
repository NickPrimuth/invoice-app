import React from 'react';
import { useParams, Redirect } from 'react-router-dom';
import { Grid, Typography, makeStyles, Paper } from '@material-ui/core';

import EditForm from './EditForm';

const Invoice = ({ invoices, setInvoices, redirect, handleRedirect }) => {
  const classes = useStyles(); // Style hook for Material UI
  let { id } = useParams(); // Get the id from the URL params

  if (redirect) return <Redirect to='/' />;

  return (
    <Grid container justify='center'>
      <Grid item xs={10} container justify='flex-start'>
        <Paper className={classes.formWrapper}>
          <Grid container justify='center'>
            <Grid item xs={11} container justify='flex-start'>
              <Typography
                className={classes.titleSpacing}
                color='primary'
                variant='h2'
              >
                {invoices[id].name} Invoice
              </Typography>
            </Grid>
          </Grid>
          <EditForm
            invoices={invoices}
            setInvoices={setInvoices}
            redirect={redirect}
            handleRedirect={handleRedirect}
          />
        </Paper>
      </Grid>
    </Grid>
  );
};

const useStyles = makeStyles((theme) => ({
  formWrapper: {
    marginTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    paddingTop: theme.spacing(4),
    backgroundColor: theme.palette.background.default,
  },

  titleSpacing: {
    marginBottom: '8px',
  },
}));

export default Invoice;
