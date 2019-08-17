import React, { useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardActions,
  CardContent,

  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TablePagination,

  Button
} from '@material-ui/core';
import { Detail } from './Detail';


const useStyles = makeStyles(theme => ({
  root: {},
  content: {
    padding: 0
  },
  inner: {
    minWidth: 1050
  },
  nameContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  avatar: {
    marginRight: theme.spacing(2)
  },
  actions: {
    justifyContent: 'flex-end'
  }
}));

function HistoryHead() {
  const titles = [
    '單號', '時間', '用戶ID', '下注', '總得分', '特色遊戲', '詳情'
  ];

  return (
    <TableHead>
      <TableRow>
        {titles.map((title) =>
          (<TableCell key={title}>{title}</TableCell>))}
      </TableRow>
    </TableHead>
  );
}

function HistoryBody({ data }) {

  const [record, setSelectedRecord] = useState(undefined);

  function onDetailOpen(record) {
    setSelectedRecord(record);
  }

  function onDetailClose() {
    setSelectedRecord(undefined);
  }

  function hasFeatureGame(record) {
    for (const game of Object.values(record.featureGame)) {
      if (game.length > 0) return String(true);
    }
  }

  if (!data) return null;

  return (
    <TableBody>
      {data.map((record) => (
        <TableRow hover key={record.uid}>

          <TableCell>{record.uid}</TableCell>

          <TableCell>
            {moment(record.time).format('YYYY/MM/DD HH:mm')}
          </TableCell>

          <TableCell>{record.userID}</TableCell>

          <TableCell>{record.bet}</TableCell>

          <TableCell>{record.totalScores}</TableCell>

          <TableCell>{hasFeatureGame(record)}</TableCell>

          <TableCell>
            <Button
              variant="contained" color="primary" onClick={() => onDetailOpen(record)}>
              詳情
            </Button>
          </TableCell>

        </TableRow>
      ))}

      {(record) && <Detail open={true} onClose={onDetailClose} record={record}/>}
    </TableBody>
  );
}

export function HistoryTable(props) {
  const {
    data, count,
    page, onChangePage,
    rowsPerPage, onChangeRowsPerPage
  } = props;

  const classes = useStyles();

  return (
    <Card className={classes.root}>

      <CardContent className={classes.content}>
        <PerfectScrollbar>
          <div className={classes.inner}>
            <Table>
              <HistoryHead/>
              <HistoryBody data={data}/>
            </Table>
          </div>
        </PerfectScrollbar>
      </CardContent>

      <CardActions className={classes.actions}>
        <TablePagination
          component="div"

          onChangePage={onChangePage}
          onChangeRowsPerPage={onChangeRowsPerPage}

          count={count}
          page={page}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </CardActions>
    </Card>
  );
}
