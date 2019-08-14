import React, { useState } from 'react';
import clsx from 'clsx';
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

function HistoryBody({ data, rows, page }) {

  const from = page * rows;
  const to = from + rows;

  const [record, setSelectedRecord] = useState(undefined);

  function onDetailOpen(record) {
    setSelectedRecord(record);
  }

  function onDetailClose() {
    setSelectedRecord(undefined);
  }

  function hasFeatureGame(record) {
    for (const game of Object.values(record.featureGame)) {
      if (game.length > 0) return String(true)
    }
  }

  return (
    <TableBody>
      {data.slice(from, to).map((record) => (
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

export const HistoryTable = props => {
  const { className, data, count, ...rest } = props;

  const classes = useStyles();

  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);

  function onChangePage(event, page) {
    setPage(page);
  }

  function onChangeRowsPerPage(event) {
    setRowsPerPage(event.target.value);
  }

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}>

      <CardContent className={classes.content}>
        <PerfectScrollbar>
          <div className={classes.inner}>
            <Table>
              <HistoryHead/>
              <HistoryBody data={data} rows={rowsPerPage} page={page}/>
            </Table>
          </div>
        </PerfectScrollbar>
      </CardContent>

      <CardActions className={classes.actions}>
        <TablePagination
          component="div"
          count={count}
          onChangePage={onChangePage}
          onChangeRowsPerPage={onChangeRowsPerPage}
          page={page}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </CardActions>
    </Card>
  );
};

HistoryTable.propTypes = {
  className: PropTypes.string,
  data: PropTypes.array.isRequired
};
