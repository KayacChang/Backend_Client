import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { IconButton, Grid, Typography } from '@material-ui/core';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

import { Toolbar, ProductCard } from './components';

import mockData from './data';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  },
  pagination: {
    marginTop: theme.spacing(3),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end'
  }
}));

export function ProductList(props) {
  const classes = useStyles();

  const [products] = useState(mockData);

  function Content() {
    return (
      <div className={classes.content}>
        <Grid container spacing={3}>
          {
            products.map(product =>
              <ProductCard key={product.id} func={props.match.url} product={product}/>)
          }
        </Grid>
      </div>
    );
  }

  function Footer() {
    return (
      <div className={classes.pagination}>
        <Typography variant="caption">1-6 of 20</Typography>

        <IconButton>
          <ChevronLeftIcon/>
        </IconButton>

        <IconButton>
          <ChevronRightIcon/>
        </IconButton>

      </div>
    );
  }

  return (
    <div className={classes.root}>

      <Toolbar/>

      <Content/>

      <Footer/>

    </div>
  );
}
