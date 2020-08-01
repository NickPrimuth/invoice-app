import React from 'react';
import {
  Grid,
  FormControl,
  InputLabel,
  OutlinedInput,
  makeStyles,
  IconButton,
} from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import { Field } from 'formik';

const LineItem = ({
  index,
  isSubmitting,
  minLineItem,
  setMinLineItem,
  values,
  arrayHelpers,
}) => {
  const classes = useStyles();
  return (
    <Grid
      className={classes.formLeft}
      container
      alignItems='center'
      justify='space-between'
      key={index}
      spacing={1}
    >
      <Grid item xs={7} sm={9}>
        <FormControl variant='outlined' className={classes.formControl}>
          <InputLabel
            htmlFor={`lineItems.${index}.description`}
            className={classes.label}
          >
            Description
          </InputLabel>
          <Field
            as={OutlinedInput}
            fullWidth
            multiline
            id={`lineItems.${index}.description`}
            name={`lineItems.${index}.description`}
            className={classes.textField}
          />
        </FormControl>
      </Grid>
      <Grid item xs={3} sm={2}>
        <FormControl variant='outlined' className={classes.formControl}>
          <InputLabel
            htmlFor={`lineItems.${index}.amount`}
            className={classes.label}
          >
            Amount ($)
          </InputLabel>
          <Field
            as={OutlinedInput}
            fullWidth
            id={`lineItems.${index}.amount`}
            name={`lineItems.${index}.amount`}
            className={classes.textField}
          />
        </FormControl>
      </Grid>
      <IconButton
        className={classes.clearIcon}
        size='small'
        type='button'
        name='button'
        variant='contained'
        // color='primary'
        disabled={isSubmitting || minLineItem}
        onClick={() => {
          if (values.lineItems.length === 1) {
            setMinLineItem(true);
            setTimeout(() => {
              setMinLineItem(false);
            }, 6000);
          } else {
            arrayHelpers.remove(index);
          }
        }}
      >
        <ClearIcon />
      </IconButton>
    </Grid>
  );
};

export default LineItem;

const useStyles = makeStyles((theme) => ({
  formControl: {
    width: '100%',
  },
  formLeft: {
    padding: '8px 8px 8px 0px',
  },
  formFull: {
    padding: '8px 0px 8px 0px',
  },
  label: {
    backgroundColor: '#ffffff',
    color: theme.palette.primary.light,
    padding: '0px 1px 0px 2px',
    fontWeight: 500,
  },
  textField: {
    backgroundColor: '#ffffff',
    fontSize: theme.typography.button.fontSize,
    color: theme.palette.primary.dark,
    fontWeight: 500,
  },
  lineItemContainer: {
    marginTop: theme.spacing(2),
  },
  clearIcon: {
    minWidth: '1.75rem',
    minHeight: '1.75rem',
    backgroundColor: theme.palette.background.default,
    color: theme.palette.secondary.main,
    '&:hover': {
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.text.secondary,
    },
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
