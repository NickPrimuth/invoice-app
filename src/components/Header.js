import React from 'react';
import { Grid, AppBar, Toolbar, Typography, useTheme } from '@material-ui/core';

export default function Header() {
  const theme = useTheme();
  return (
    <>
      <AppBar
        style={{ backgroundColor: theme.palette.primary.main }}
        position='relative'
      >
        <Toolbar>
          <Grid container justify='center' alignItems='center'>
            <Typography
              style={{
                margin: theme.spacing(1),
              }}
              variant='h1'
            >
              INVOICE APP
            </Typography>
          </Grid>
        </Toolbar>
      </AppBar>
    </>
  );
}
