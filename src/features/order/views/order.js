import React from 'react';
import { connect } from 'react-redux';

import fetchApi from '../../../modules/fetch-api';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto'
  },
  table: {
    minWidth: 700
  }
});

function SimpleTable(props) {}

class Order extends React.Component {
  constructor(props, context) {
    super(props, context);

    // this.onSubmit = this.onSubmit.bind(this);
    // this.refInput = this.refInput.bind(this);
  }

  componentDidMount() {
    const { loadOrders, user } = this.props;

    // loadOrders([
    //   {
    //     name: 'the order 1',
    //     email: 'abc@xyz.com',
    //     order_items: [
    //       {
    //         id: 1,
    //         name: 'X',
    //         description: 'This is good',
    //         keywords: ['abc', 'def', 'xyz'],
    //         image: '1-a.jpg',
    //         age: ['0', '+'],
    //         price: 10.24,
    //         qty: 3
    //       }
    //     ]
    //   }
    // ]);

    // fetchApi("get", "/api/ordersFromApi").then(json => {
    fetchApi('get', '/api/order?customerId=' + user.customer_id).then(json => {
      console.log(JSON.stringify(json));
      loadOrders(json);
    });
  }

  renderOrder() {
    // temporary just first order
    const { orders, classes } = this.props;

    return (
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Order ID</TableCell>
              <TableCell>Address</TableCell>
              <TableCell numeric>Total Price</TableCell>
              <TableCell>Order Time</TableCell>
              <TableCell>Delivery Time</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map(row => {
              return (
                <TableRow key={row.orders_id}>
                  <TableCell component="th" scope="row">
                    {row.orders_id}
                  </TableCell>
                  <TableCell>{row.address}</TableCell>
                  <TableCell numeric>{row.total_price}</TableCell>
                  <TableCell>{row.order_time}</TableCell>
                  <TableCell>
                    {row.dilivery_time ? row.dilivery_time : 'Not yet'}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Paper>
    );
  }

  render() {
    return (
      <div>{this.props.orders.length > 0 ? this.renderOrder() : 'Loading'}</div>
    );
  }
}

function mapStateToProps(state) {
  return {
    orders: state.orders,
    user: state.user
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loadOrders: orders => {
      dispatch({ type: 'LOAD_ORDERS', payload: orders });
    }
  };
}

Order.propTypes = {
  classes: PropTypes.object.isRequired
};

Order = withStyles(styles)(Order);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Order);
