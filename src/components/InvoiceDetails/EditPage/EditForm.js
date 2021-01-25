import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Grid,
  Button,
  Typography,
  makeStyles,
  IconButton,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { Formik, Form, FieldArray, useFormikContext } from 'formik';

import FormLine from '../FormLine';
import LineItem from '../LineItem';

const EditForm = ({ invoices, setInvoices, redirect, handleRedirect }) => {
  const classes = useStyles(); // Style hook for Material UI
  let { id } = useParams(); // Get the id from the URL params

  const [invoiceTotal, setInvoiceTotal] = useState(0); // Total amount on invoice
  const [minLineItem, setMinLineItem] = useState(false); //disable line item when only 1 left

  // Function to hook into form to update total
  const TotalToken = () => {
    const { values } = useFormikContext();

    useEffect(() => {
      const currentTotal = values.lineItems.reduce((acc, currentValue) => {
        return acc + parseFloat(currentValue.amount || 0);
      }, 0);
      setInvoiceTotal(currentTotal);
    }, [values.lineItems]);

    return null;
  };

  const DeleteInvoice = () => {
    fetch('/api/deleteInvoice', {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        id: id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data[0]) {
          handleRedirect();
        }
        if (!data[id]) {
          // setInvoices(data);
          handleRedirect();
        }
        setInvoices(data);
        handleRedirect();
      })
      .catch((e) => console.error(e));
  };
  return (
    <Formik
      enableReinitialize
      validateOnChange={true}
      initialValues={invoices[id]}
      onSubmit={(data, { setSubmitting, resetForm }) => {
        // Define route and method to be used
        // let route = editInvoice ? 'editInvoice' : 'addInvoice';
        setSubmitting(true);
        fetch(`/api/editInvoice`, {
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST',
          body: JSON.stringify({
            id: id,
            name: data.name,
            email: data.email,
            dueDate: data.dueDate,
            lineItems: data.lineItems,
            total:
              invoiceTotal[0] === 0
                ? invoiceTotal.slice(1, invoiceTotal.length)
                : invoiceTotal,
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            setSubmitting(false);
            setInvoices(data);
            handleRedirect();
          })
          .catch((e) => {
            console.error(e, 'ERROR');
          });
      }}
    >
      {({ values, isSubmitting, errors }) => {
        const valueKeys = ['Name', 'Email', 'Due Date'];
        const keys = ['name', 'email', 'dueDate'];
        return (
          <Form className={classes.root}>
            <Grid container justify='center'>
              {valueKeys.map((value, index) => {
                if (index > 2) return null;
                return (
                  <FormLine
                    index={index}
                    valueKeys={valueKeys}
                    keys={keys}
                    key={index}
                  />
                );
              })}
              <Grid
                className={classes.lineItemContainer}
                item
                xs={11}
                container
                alignItems='center'
              >
                <Grid item xs={12}>
                  <Typography
                    className={classes.titleSpacing}
                    color='primary'
                    variant='h3'
                  >
                    Line Items
                  </Typography>
                </Grid>
                <FieldArray
                  name='lineItems'
                  render={(arrayHelpers) => (
                    <>
                      <Grid container justify='center'>
                        {values.lineItems.map((lineItem, index) => (
                          <LineItem
                            index={index}
                            isSubmitting={isSubmitting}
                            minLineItem={minLineItem}
                            setMinLineItem={setMinLineItem}
                            values={values}
                            arrayHelpers={arrayHelpers}
                            key={index}
                          />
                        ))}
                        {minLineItem ? (
                          <Grid container justify='flex-start'>
                            <Typography
                              align='left'
                              color='error'
                              variant='caption'
                              className={classes.errorMessage}
                            >
                              1 line item is required per invoice
                            </Typography>
                          </Grid>
                        ) : null}
                      </Grid>

                      <IconButton
                        className={classes.addIcon}
                        size='small'
                        type='button'
                        name='button'
                        variant='contained'
                        // color='primary'
                        disabled={isSubmitting}
                        onClick={() => {
                          if (minLineItem) setMinLineItem(false);
                          arrayHelpers.push({
                            description: '',
                            amount: null,
                          });
                        }}
                      >
                        <AddIcon />
                      </IconButton>
                    </>
                  )}
                />
              </Grid>
              <Grid item xs={11} container justify='flex-end'>
                <Grid container justify='flex-end' item xs={3}>
                  <Typography variant='body1'>Total:</Typography>
                </Grid>
                <Grid item xs={3} container justify='flex-end'>
                  <Typography variant='body2'>
                    ${invoiceTotal.toFixed(2)}
                  </Typography>
                </Grid>
              </Grid>

              <Grid
                item
                xs={11}
                container
                alignItems='center'
                justify='flex-start'
              >
                <Grid item xs={4} container justify='flex-start'>
                  <Button
                    size='large'
                    variant='contained'
                    disabled={isSubmitting}
                    component={Link}
                    to='/'
                    className={classes.backButton}
                  >
                    <Typography variant='body2'>BACK</Typography>
                  </Button>
                </Grid>
                <Grid item xs={4} container justify='center'>
                  <Button
                    size='large'
                    variant='contained'
                    disabled={isSubmitting}
                    onClick={DeleteInvoice}
                    className={classes.deleteButton}
                  >
                    <Typography variant='body2'>DELETE</Typography>
                  </Button>
                </Grid>
                <Grid item xs={4} container justify='flex-end'>
                  <Button
                    size='large'
                    type='submit'
                    name='submit'
                    variant='contained'
                    color='primary'
                    disabled={isSubmitting}
                    className={classes.saveButton}
                  >
                    <Typography variant='body2'>SAVE</Typography>
                  </Button>
                </Grid>
              </Grid>
            </Grid>

            <TotalToken />
          </Form>
        );
      }}
    </Formik>
  );
};

export default EditForm;

const useStyles = makeStyles((theme) => ({
  lineItemContainer: {
    marginTop: theme.spacing(2),
  },
  addIcon: {
    minWidth: '1.75rem',
    minHeight: '1.75rem',
    backgroundColor: theme.palette.background.default,
    color: theme.palette.primary.main,
    '&:hover': {
      color: theme.palette.text.secondary,
      backgroundColor: theme.palette.primary.main,
    },
  },
  backButton: {
    minWidth: theme.spacing(14),
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.text.secondary,
    '&:hover': {
      backgroundColor: theme.palette.primary.doubleLight,
      color: theme.palette.text.primary,
    },
  },
  deleteButton: {
    minWidth: theme.spacing(14),
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.text.secondary,
    '&:hover': {
      backgroundColor: theme.palette.secondary.light,
      color: theme.palette.text.primary,
    },
  },
  saveButton: {
    minWidth: theme.spacing(14),
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.text.secondary,
    '&:hover': {
      backgroundColor: theme.palette.primary.extraLight,
      color: theme.palette.text.secondary,
    },
  },
  errorMessage: {
    marginLeft: theme.spacing(0.25),
    marginTop: theme.spacing(-0.5),
  },
}));
