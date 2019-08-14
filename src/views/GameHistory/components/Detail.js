import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/styles';

import { Close as CloseIcon } from '@material-ui/icons';

import PerfectScrollbar from 'react-perfect-scrollbar';

import {
  IconButton,

  Dialog,
  DialogTitle as MuiDialogTitle,
  DialogContent,

  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow

} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 0,
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  inner: {
    minWidth: 1050
  },
  title: {
    padding: theme.spacing(2),
    fontWeight: 'bold'
  },
  closeButton: {
    color: theme.palette.grey[500]
  }
}));

function DialogTitle(props) {
  const { classes, onClose } = props;

  return (
    <MuiDialogTitle disableTypography className={classes.root}>
      <IconButton className={classes.closeButton} onClick={onClose}>
        <CloseIcon/>
      </IconButton>
    </MuiDialogTitle>
  );
}

function Header({ titles }) {
  return (
    <TableHead>
      <TableRow>
        {titles.map((title) =>
          (<TableCell key={title}>{title}</TableCell>))}
      </TableRow>
    </TableHead>
  );
}

function Record({ scores, result }) {
  return (
    <TableRow hover>
      <TableCell>{scores}</TableCell>
      <TableCell>{JSON.stringify(result)}</TableCell>
    </TableRow>
  );
}

export function Detail(props) {
  const classes = useStyles();
  const { onClose, open, record } = props;

  const totalTitles = [
    '總得分'
  ];
  const normalGameTitles = [
    '主遊戲得分', '主遊戲結果'
  ];

  const featureGameTitles = {
    freeGame: ['免費遊戲得分', '免費遊戲結果'],
    reSpin: ['重轉遊戲得分', '重轉遊戲結果']
  };

  function hasFeatureGame(record) {
    for (const game of Object.values(record.featureGame)) {
      if (game.length > 0) return true;
    }
  }

  function GameSection(reSpin, titles) {
    return (
      <Table>
        <Header titles={titles}/>

        <TableBody>
          {reSpin.map((game, index) => (
            <Record
              key={String(index)}
              scores={game.scores}
              result={game.result}/>
          ))}
        </TableBody>

      </Table>
    );
  }

  function FeatureGameSection(record) {
    if (!hasFeatureGame(record)) return;

    const { reSpin, freeGame } = record.featureGame;

    return (
      <DialogContent>
        {
          reSpin.length ?
            GameSection(reSpin, featureGameTitles['reSpin']) : null
        }
        {
          freeGame.length ?
            GameSection(freeGame, featureGameTitles['freeGame']) : null
        }
      </DialogContent>
    );
  }

  return (
    <Dialog onClose={onClose} open={open} fullWidth={true} maxWidth={'md'}>
      <DialogTitle onClose={onClose} classes={classes}>詳情</DialogTitle>

      <PerfectScrollbar>

        <DialogContent>
          <Table>
            <Header titles={totalTitles}/>

            <TableBody>
              <TableRow hover>
                <TableCell>{record.totalScores}</TableCell>
              </TableRow>
            </TableBody>

          </Table>
        </DialogContent>

        <DialogContent>
          <Table>
            <Header titles={normalGameTitles}/>

            <TableBody>
              <Record
                scores={record.normalGame.scores}
                result={record.normalGame.result}/>
            </TableBody>

          </Table>
        </DialogContent>

        {FeatureGameSection(record)}

      </PerfectScrollbar>

    </Dialog>
  );
}

Detail.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired
};
