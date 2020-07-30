import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Grid,
  Container,
  FormControl,
  InputLabel,
  OutlinedInput,
  Button,
  Typography,
  makeStyles,
} from '@material-ui/core';
import { Formik, Form, Field } from 'formik';

const Invoice = () => {
  // Style hook for Material UI
  const classes = useStyles();

  // State hook for current invoice
  const [invoice, setInvoice] = useState({});

  const [invoiceTotal, setInvoiceTotal] = useState(0);

  // Boolean to check if creating or editing a invoice
  const [editInvoice, setEditInvoice] = useState(false);
  // Get the id from the params pased through the url
  let { id } = useParams();

  // Fetch invoices and set them into state
  useEffect(() => {
    console.log(id, 'id', 'edit invoice? :');
    // Check if params are present
    if (id) {
      // Func to get single invoice
      const getInvoice = async () => {
        // Fetch to api endpoint for invoices
        const invoiceData = await fetch(`/api/${id}`).then((res) => res.json());

        // Update invoice state
        setInvoice(invoiceData);
        setEditInvoice(true);
      };
      getInvoice();
    }
  }, [id]);

  // useEffect to update total
  useEffect(() => {
    setInvoiceTotal(
      invoice.lineItems.reduce((acc, currentValue) => {
        return acc + currentValue;
      })
    );
  }, [invoice.lineItems]);

  return (
    <Container fixed disableGutters>
      <Grid item xs={12} container justify='center'>
        <Grid container justify='center' item xs={11}>
          <Formik
            validateOnChange={true}
            initialValues={{
              name: invoice.name || '',
              email: invoice.email || '',
              dueDate: invoice.dueDate || '',
              lineItems: invoice.lineItems || [
                {
                  description: '',
                  amount: 0,
                },
              ],
              total: invoiceTotal,
            }}
            onSubmit={(data, { setSubmitting, resetForm }) => {
              // Define route and method to be used
              // let route = editInvoice ? 'editInvoice' : 'addInvoice';
              console.log(data);
              try {
                fetch(`/api/1`, {
                  // headers: {
                  //   'Content-Type': 'application/json',
                  // },
                  // method: 'GET',
                  // body: JSON.stringify({
                  //   id: 0,
                  //   name: data.name,
                  //   email: data.email,
                  //   dueDate: data.dueDate,
                  //   lineItems: data.lineItems,
                  // }),
                })
                  .then((res) => res.json())
                  .then((data) => {
                    console.log(data);
                  });
              } catch (e) {
                console.log(e, 'ERROR');
              }
            }}
          >
            {({ values, isSubmitting, errors }) => {
              // console.log(typeof errors.firstName === string , '-----------------');
              return (
                <Form className={classes.root}>
                  <Grid container justify='center'>
                    <Grid
                      item
                      xs={10}
                      className={classes.formLeft}
                      container
                      alignItems='center'
                    >
                      <FormControl
                        variant='outlined'
                        className={classes.formControl}
                      >
                        <InputLabel htmlFor='name' className={classes.label}>
                          Name
                        </InputLabel>
                        <Field
                          as={OutlinedInput}
                          fullWidth
                          id='name'
                          name='name'
                          // aria-describedby='nameError'
                          className={classes.textField}
                          aria-invalid={errors.name ? true : false}
                        />
                        {/* <ErrorMessage id='nameError' name='name'>
                          {() => (
                            <div className={classes.errorMessage}>
                               Name is required
                            </div>
                          )}
                        </ErrorMessage> */}
                      </FormControl>
                    </Grid>
                    <Grid item xs={10} className={classes.formLeft}>
                      <FormControl
                        variant='outlined'
                        className={classes.formControl}
                      >
                        <InputLabel htmlFor='email' className={classes.label}>
                          Email
                        </InputLabel>
                        <Field
                          as={OutlinedInput}
                          fullWidth
                          id='email'
                          name='email'
                          className={classes.textField}
                          aria-invalid={errors.email ? true : false}
                        />
                        {/* <ErrorMessage name='email'>
                          {() => (
                            <div className={classes.errorMessage}>
                              Email is required
                            </div>
                          )}
                        </ErrorMessage> */}
                      </FormControl>
                    </Grid>
                    <Grid item xs={10} className={classes.formRight}>
                      <FormControl
                        variant='outlined'
                        className={classes.formControl}
                      >
                        <InputLabel htmlFor='dueDate' className={classes.label}>
                          Due Date
                        </InputLabel>
                        <Field
                          as={OutlinedInput}
                          fullWidth
                          id='dueDate'
                          name='dueDate'
                          className={classes.textField}
                          aria-invalid={errors.dueDate ? true : false}
                        />
                        {/* <ErrorMessage name='dueDate'>
                          {() => (
                            <div className={classes.errorMessage}>
                              Due Date Number is required
                            </div>
                          )}
                        </ErrorMessage> */}
                      </FormControl>
                    </Grid>
                    <Grid container xs={12} item>
                      <Button
                        size='large'
                        type='submit'
                        name='submit'
                        variant='contained'
                        color='primary'
                        disabled={isSubmitting}
                        style={{ marginLeft: '16px' }}
                      >
                        <Typography color='textPrimary' variant='body2'>
                          submit
                        </Typography>
                      </Button>
                    </Grid>
                  </Grid>
                  <div style={{ color: 'black' }}>
                    <pre>{JSON.stringify(values, null, 2)}</pre>
                    <pre>{JSON.stringify(errors, null, 2)}</pre>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </Grid>
      </Grid>
    </Container>
  );
};

const useStyles = makeStyles((theme) => ({
  wrapper: {
    width: '100%',
  },
  root: {
    marginBottom: theme.spacing(4),
  },
  formControl: {
    width: '100%',
  },
  formLeft: {
    padding: '8px 8px 8px 0px',
  },
  formRight: {
    padding: '8px 0px 8px 8px',
  },
  formFull: {
    padding: '8px 0px 8px 0px',
  },
  label: {
    backgroundColor: '#fcfcfc',
    color: theme.palette.text.secondary,
    padding: '0px 1px 0px 2px',
  },
  textField: {
    backgroundColor: '#fcfcfc',
    fontSize: theme.typography.button.fontSize,
    color: theme.palette.text.secondary,
  },
  checkboxLabel: {
    // fontSize: theme.typography.h5.fontSize,
    color: theme.palette.text.secondary,
  },
  errorMessage: {
    color: theme.palette.error.main,
    marginLeft: theme.spacing(0.5),
    marginTop: theme.spacing(0.25),
    marginBottom: theme.spacing(-0.75),
    fontSize: '.75rem',
    '@media (max-width:600px)': {
      fontSize: '.7rem',
    },
  },
  modalCard: {
    position: 'absolute',
    width: '40%',
    backgroundColor: theme.palette.background.paper,
    border: `2px solid ${theme.palette.primary.main}`,
    boxShadow: theme.shadows[1],
    top: '25%',
    margin: 'auto',
  },
}));

export default Invoice;
