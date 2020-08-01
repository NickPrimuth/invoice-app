import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles, Grid, Typography, Button, Paper } from '@material-ui/core';

export default function InvoiceOverview({ invoice }) {
  const classes = useStyles();

  return (
    <Paper>
      <Grid className={classes.invoicePadding} container>
        <Grid container alignItems='flex-end' justify='flex-start' item xs={12}>
          <Grid item xs={8}>
            <Grid item xs={12}>
              <Typography
                className={classes.invoiceLineTitle}
                display='inline'
                variant='body1'
              >
                Name:
              </Typography>
              <Typography display='inline' variant='body2'>
                {invoice.name}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography
                className={classes.invoiceLineTitle}
                display='inline'
                variant='body1'
              >
                Email:
              </Typography>
              <Typography display='inline' variant='body2'>
                {invoice.email}
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Typography
                className={classes.invoiceLineTitle}
                display='inline'
                variant='body1'
              >
                Due Date:
              </Typography>
              <Typography display='inline' variant='body2'>
                {invoice.dueDate.slice(0, 10)}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography
                className={classes.invoiceLineTitle}
                display='inline'
                variant='body1'
              >
                Total:
              </Typography>
              <Typography display='inline' variant='body2'>
                ${invoice.total.toFixed(2)}
              </Typography>
            </Grid>
          </Grid>

          <Grid container justify='flex-end' item xs={3}>
            <Button
              size='large'
              variant='contained'
              className={classes.editButton}
              color='secondary'
              component={Link}
              to={`/editInvoice/${invoice.id}`}
            >
              <Typography variant='body2'>EDIT</Typography>
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}

const useStyles = makeStyles((theme) => ({
  invoiceContainer: {
    [theme.breakpoints.up('lg')]: {
      margin: 0,
    },
  },
  invoicePadding: {
    padding: theme.spacing(1),
  },
  editButton: {
    minWidth: theme.spacing(14),
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.text.secondary,
    '&:hover': {
      backgroundColor: theme.palette.primary.light,
      color: theme.palette.text.secondary,
    },
  },
  invoiceLineTitle: {
    marginRight: theme.spacing(1),
  },
}));
