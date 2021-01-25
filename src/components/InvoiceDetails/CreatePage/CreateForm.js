import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Grid,
  Button,
  Typography,
  makeStyles,
  IconButton,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { Formik, Form, FieldArray } from 'formik';

import FormLine from '../FormLine';
import LineItem from '../LineItem';

const CreateForm = ({ setInvoices, handleRedirect, redirect }) => {
  const classes = useStyles(); // Style hook. CSS at bottom of page

  //disable line item when only 1
  const [minLineItem, setMinLineItem] = useState(false);
  return (
    <Formik
      enableReinitialize
      validateOnChange={true}
      initialValues={{
        name: '',
        email: '',
        dueDate: null,
        lineItems: [
          {
            description: '',
            amount: null,
          },
        ],
      }}
      // OnSubmit function fired when Create Button is clicked
      onSubmit={(data, { setSubmitting }) => {
        setSubmitting(true); // Disable submit button while sending data

        fetch(`/api/addInvoice`, {
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST',
          body: JSON.stringify({
            name: data.name,
            email: data.email,
            dueDate: data.dueDate ? data.dueDate : new Date(),
            lineItems: data.lineItems,
            total: data.lineItems.reduce((acc, currentValue) => {
              return acc + parseFloat(currentValue.amount || 0);
            }, 0),
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            // On success, set new invoices into state and redirect
            setSubmitting(false);
            setInvoices(data);
            handleRedirect();
          })
          .catch((e) => {
            console.log(e);
          });
      }}
    >
      {({ values, isSubmitting }) => {
        // Strings for mapping over corresponding lines
        const valueKeys = ['Name', 'Email', 'Due Date'];
        const keys = ['name', 'email', 'dueDate'];
        return (
          <Form>
            <Grid container justify='center'>
              {/* Map over to form first 3 lines */}
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
                <Typography
                  className={classes.titleSpacing}
                  color='primary'
                  variant='h3'
                >
                  Line Items
                </Typography>
                <FieldArray
                  name='lineItems'
                  render={(arrayHelpers) => (
                    <>
                      <Grid container justify='center'>
                        {/* Map over line items  */}
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
                    $
                    {isNaN(
                      values.lineItems
                        .reduce((acc, currentValue) => {
                          return acc + parseFloat(currentValue.amount);
                        }, 0)
                        .toFixed(2)
                    )
                      ? Number('0').toFixed(2)
                      : values.lineItems
                          .reduce((acc, currentValue) => {
                            return acc + parseFloat(currentValue.amount);
                          }, 0)
                          .toFixed(2)}
                  </Typography>
                </Grid>
              </Grid>
              <Grid
                item
                xs={11}
                className={classes.formLeft}
                container
                alignItems='center'
                justify='flex-end'
              >
                <Grid item xs={6} container justify='flex-start'>
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
                <Grid item xs={6} container justify='flex-end'>
                  <Button
                    size='large'
                    type='submit'
                    name='submit'
                    variant='contained'
                    disabled={isSubmitting}
                    className={classes.createButton}
                  >
                    <Typography variant='body2'>CREATE</Typography>
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default CreateForm;

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
  createButton: {
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
