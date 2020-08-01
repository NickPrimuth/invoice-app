import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles, Grid, Typography, Button } from '@material-ui/core';

import InvoiceOverview from './InvoiceOverview';

const ListView = ({ invoices }) => {
  const classes = useStyles();

  // Render single column until 5 invoices. Then render two columns on the page
  const [shortList, setShortList] = useState(invoices.length > 4 ? 6 : 12);

  useEffect(() => {
    invoices.length > 4 ? setShortList(6) : setShortList(12);
  }, [invoices.length]);

  return (
    <Grid
      container
      alignContent='flex-start'
      justify='center'
      className={classes.topContainer}
    >
      <Grid item xs={11} container justify='flex-end'>
        <Button
          size='large'
          variant='contained'
          className={classes.createButton}
          component={Link}
          to={'/createInvoice'}
        >
          <Typography variant='body2'>CREATE INVOICE</Typography>
        </Button>
      </Grid>

      <Grid
        className={classes.invoicesContainer}
        spacing={6}
        container
        justify='flex-start'
        item
        xs={11}
      >
        {invoices.map((invoice, index) => {
          return (
            <Grid
              className={classes.invoiceContainer}
              item
              xs={12}
              lg={shortList}
              key={index}
            >
              <InvoiceOverview invoice={invoice} />
            </Grid>
          );
        })}
      </Grid>
    </Grid>
  );
};

const useStyles = makeStyles((theme) => ({
  topContainer: {
    marginTop: theme.spacing(3),
    width: '100%',
  },
  invoicesContainer: {
    [theme.breakpoints.up('lg')]: {
      margin: '0px 40px',
    },
    marginTop: theme.spacing(0),
  },
  createButton: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.background.default,
    '&:hover': {
      color: theme.palette.background.default,

      backgroundColor: theme.palette.secondary.light,
    },
    marginRight: theme.spacing(3),
  },
}));

export default ListView;
