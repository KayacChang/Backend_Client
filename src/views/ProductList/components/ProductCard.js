import React from 'react';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardContent,
  CardActionArea,
  Typography, Grid
} from '@material-ui/core';

import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({

  root: {
    padding: theme.spacing(3)
  },

  imageContainer: {
    height: 64,
    width: 64,
    margin: '0 auto',
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: '5px',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },

  image: {
    width: '100%'
  },

  statsItem: {
    display: 'flex',
    alignItems: 'center'
  },

  statsIcon: {
    color: theme.palette.icon,
    marginRight: theme.spacing(1)
  }

}));

export function ProductCard(props) {
  const { product, func } = props;

  const classes = useStyles();

  const { name, imageURL, } = product;

  const href = `${func}/${name.toLowerCase()}`;

  return (
    <Container>
      <Link to={href}>
        <CardContent>
          <Image/>

          <Title/>
        </CardContent>
      </Link>
    </Container>
  );

  function Image() {
    return (
      <div className={classes.imageContainer}>
        <img alt="Product" className={classes.image} src={imageURL}/>
      </div>
    );
  }

  function Title() {
    return (
      <Typography align="center" variant="h4" gutterBottom>
        {name}
      </Typography>
    );
  }

  function Container({ children }) {
    return (
      <Grid item lg={4} md={6} xs={12}>
        <Card className={classes.root}>
          <CardActionArea>
            {children}
          </CardActionArea>
        </Card>
      </Grid>
    );
  }
}

