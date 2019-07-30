import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardContent,
  CardActionArea,
  Typography
} from '@material-ui/core';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  root: {},
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

const ProductCard = props => {
  const { className, product, func, ...rest } = props;

  const classes = useStyles();

  const href = `${func}/${product.title.toLowerCase()}`;

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardActionArea>
        <Link to={href}>
          <CardContent>
            <div className={classes.imageContainer}>
              <img
                alt="Product"
                className={classes.image}
                src={product.imageUrl}
              />
            </div>
            <Typography
              align="center"
              variant="h4"
              gutterBottom
            >
              {product.title}
            </Typography>
          </CardContent>
        </Link>
      </CardActionArea>
    </Card>
  );
};

ProductCard.propTypes = {
  className: PropTypes.string,
  product: PropTypes.object.isRequired
};

export default ProductCard;
