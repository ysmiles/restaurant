import React from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardHeader from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles = {
  card: {
    minWidth: 200
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)'
  },
  title: {
    fontSize: 24
  },
  pos: {
    marginBottom: 12
  }
};

function Cart(props) {
  const { classes, cart } = props;
  const totalPrice = cart.reduce(
    (acc, item) => acc + item.unit_price * item.quantity,
    0
  );

  return (
    <div className="Cart">
      <Card className={classes.card}>
        <CardHeader>
          <Typography
            className={classes.title}
            color="textSecondary"
            gutterBottom
          >
            My Cart
          </Typography>
        </CardHeader>
        <CardContent>
          <table className="CartTable">
            <thead>
              <tr>
                <th>Item</th>
                <th>Quantity</th>
                <th />
                <th />
              </tr>
            </thead>

            <tbody>
              {cart.map(item => (
                <tr>
                  <td>{item.name}</td>
                  <td>{item.quantity}</td>
                  <td>
                    <button onClick={e => props.addToCart(item)}>+</button>

                    <button
                      className="RemoveButton"
                      onClick={e => props.removeFromCart(item)}
                    >
                      -
                    </button>
                  </td>
                  <td>
                    <button
                      className="RemoveAllButton"
                      onClick={e => props.removeAllFromCart(item)}
                    >
                      Remove all
                    </button>
                  </td>
                  <td>{'$ ' + item.unit_price * item.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <Typography
            className={classes.title}
            color="textSecondary"
            gutterBottom
          >
            Total Price: {totalPrice.toFixed(2)}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    cart: state.cart
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addToCart: item => {
      dispatch({ type: 'ADD', payload: item });
    },
    removeFromCart: item => {
      dispatch({ type: 'REMOVE', payload: item });
    },
    removeAllFromCart: item => {
      dispatch({ type: 'REMOVE_ALL', payload: item });
    }
  };
}

Cart.propTypes = {
  classes: PropTypes.object.isRequired
};

Cart = withStyles(styles)(Cart);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Cart);
