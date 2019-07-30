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
  Button,
} from '@material-ui/core';


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
    '單號', '時間', '用戶ID', '下注', '總得分', '詳情'
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

function HistoryBody({ data, rows }) {

  return (
    <TableBody>
      {data.slice(0, rows).map((record) => (
        <TableRow hover key={record.id}>

          <TableCell>{record.id}</TableCell>

          <TableCell>
            {moment(record.createdAt).format('YYYY/MM/DD')}
          </TableCell>

          <TableCell>{record.name}</TableCell>

          <TableCell>{record.bet}</TableCell>

          <TableCell>{record.totalScores}</TableCell>

          <TableCell>
            <Button variant="contained" color="primary">詳情</Button>
          </TableCell>

        </TableRow>
      ))}
    </TableBody>
  );
}

export const HistoryTable = props => {
  const { className, users, ...rest } = props;

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
      className={clsx(classes.root, className)}
    >

      <CardContent className={classes.content}>
        <PerfectScrollbar>
          <div className={classes.inner}>
            <Table>
              <HistoryHead/>
              <HistoryBody data={users} rows={rowsPerPage} />
            </Table>
          </div>
        </PerfectScrollbar>
      </CardContent>

      <CardActions className={classes.actions}>
        <TablePagination
          component="div"
          count={users.length}
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
  users: PropTypes.array.isRequired
};
