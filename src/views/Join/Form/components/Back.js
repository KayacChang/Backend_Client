import React from 'react';

import { IconButton } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

export function Back() {

  function handleBack() {
    window.history.back()
  }

  return (
    <IconButton onClick={handleBack}>
      <ArrowBackIcon/>
    </IconButton>
  );
}
