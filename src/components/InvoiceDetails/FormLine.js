import React from 'react';
import {
  Grid,
  FormControl,
  InputLabel,
  OutlinedInput,
  makeStyles,
} from '@material-ui/core';
import { Field } from 'formik';
import DateFnsUtils from '@date-io/moment';
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';

export default function FormLine({ index, valueKeys, keys }, props) {
  const classes = useStyles();

  const KeyboardDatePickerField = (props) => {
    return (
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        {/* still doesnt update state!! */}
        <DatePicker
          variant='dialog'
          inputVariant='outlined'
          format='YYYY-MM-DD'
          value={props.form.values.dueDate}
          InputAdornmentProps={{ position: 'end' }}
          onChange={(date) => props.form.setFieldValue('dueDate', date, false)}
          label='Due Date'
          className={classes.textField}
          // open={open}
          // onOpen={() => setOpen(true)}
        />
      </MuiPickersUtilsProvider>
    );
  };

  return (
    <Grid
      item
      xs={11}
      className={classes.formLeft}
      container
      alignItems='center'
      key={index}
    >
      <FormControl variant='outlined' className={classes.formControl}>
        {index === 2 ? (
          <Field
            component={KeyboardDatePickerField}
            fullWidth
            aria-describedby='nameError'
            className={classes.textField}
          />
        ) : (
          <>
            <InputLabel htmlFor={keys[index]} className={classes.label}>
              {valueKeys[index]}
            </InputLabel>
            <Field
              as={OutlinedInput}
              fullWidth
              id={keys[index]}
              name={keys[index]}
              // aria-describedby='nameError'
              className={classes.textField}
            />
          </>
        )}
      </FormControl>
    </Grid>
  );
}

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
  formFull: {
    padding: '8px 0px 8px 0px',
  },

  label: {
    backgroundColor: '#ffffff',
    color: theme.palette.primary.main,
    padding: '0px 1px 0px 2px',
    fontWeight: 500,
    '.MuiFormLabel-root': {
      color: theme.palette.primary.light,
    },
  },
  textField: {
    backgroundColor: '#ffffff',
    fontSize: theme.typography.button.fontSize,
    color: theme.palette.primary.main,
    fontWeight: 500,
    '& .MuiInputLabel-root': {
      backgroundColor: '#ffffff',
      color: theme.palette.primary.main,
      padding: '0px 1px 0px 2px',
      fontWeight: 500,
    },
    '& .MuiInputBase-root': {
      backgroundColor: '#ffffff',
      fontSize: theme.typography.button.fontSize,
      color: theme.palette.primary.main,
      fontWeight: 600,
    },
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
}));
