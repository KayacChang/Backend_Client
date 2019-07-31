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
} from '@material-ui/core';


const useStyles = makeStyles(theme => ({
  root: {},
  content: {
    padding: 0
  },
  inner: {
    minWidth: 1050
  },
  center: {
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

  const subTitles = [
    '單號', '用戶 ID', '當前狀態',
    '換幣時間', '平台幣別', '平台幣數量', '遊戲幣',
    '遊戲總下注額', '遊戲總贏分'
  ];

  return (
    <TableHead>

      <TableRow>
        <td colSpan={3}/>
        <TableCell colSpan={4} style={{textAlign: 'center'}}>轉入</TableCell>
        <TableCell colSpan={2} style={{textAlign: 'center'}}>結算</TableCell>
      </TableRow>

      <TableRow>
        {subTitles.map((title) =>
          (<TableCell key={title}>{title}</TableCell>))}
      </TableRow>

    </TableHead>
  );
}

function HistoryBody({ data, rows }) {
  return (
    <TableBody>
      {data.slice(0, rows).map((record) => (
        <TableRow hover key={record.id}>

          <TableCell>{record.id}</TableCell>

          <TableCell>{record.userID}</TableCell>

          <TableCell>{record.state}</TableCell>

          <TableCell>
            {moment.unix(record.exchange.createdAt).format('YYYY/MM/DD')}
          </TableCell>
          <TableCell>{record.exchange.currency}</TableCell>
          <TableCell>{record.exchange.amount}</TableCell>
          <TableCell>{record.exchange.balance}</TableCell>

          <TableCell>{record.checkout.totalBet}</TableCell>
          <TableCell>{record.checkout.totalWin}</TableCell>

        </TableRow>
      ))}
    </TableBody>
  );
}

export const HistoryTable = props => {
  const { className, data, ...rest } = props;

  const classes = useStyles();

  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);

  const handlePageChange = (event, page) => {
    setPage(page);
  };

  const handleRowsPerPageChange = event => {
    setRowsPerPage(event.target.value);
  };

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}>

      <CardContent className={classes.content}>
        <PerfectScrollbar>
          <div className={classes.inner}>
            <Table>
              <HistoryHead className={classes.center}/>
              <HistoryBody data={data}/>
            </Table>
          </div>
        </PerfectScrollbar>
      </CardContent>

      <CardActions className={classes.actions}>
        <TablePagination
          component="div"
          count={data.length}
          onChangePage={handlePageChange}
          onChangeRowsPerPage={handleRowsPerPageChange}
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
