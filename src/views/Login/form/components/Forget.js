import { Link, Typography } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import React from 'react';

export function Forget() {
  return (
    <Typography color="textSecondary" variant="body1">
      Don't have an account?{' '}

      <Link component={RouterLink} to="/join" variant="h6">
        Sign Up
      </Link>

    </Typography>
  );
}
