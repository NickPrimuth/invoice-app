import React from 'react';
import { Redirect } from 'react-router-dom';
import { Grid, Typography, makeStyles, Paper } from '@material-ui/core';

// import FormLine from './FormLine';
import CreateForm from './CreateForm';

const CreateInvoice = ({ handleRedirect, setInvoices, redirect }) => {
  const classes = useStyles(); // Style hook. CSS at bottom of page

  if (redirect) return <Redirect to='/' />; // Redirect to list after submiting

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
                New Invoice
              </Typography>
            </Grid>
          </Grid>
          <CreateForm
            redirect={redirect}
            handleRedirect={handleRedirect}
            setInvoices={setInvoices}
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

export default CreateInvoice;
