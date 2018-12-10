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
import Grid from '@material-ui/core/Grid';

const styles = {
  card: {
    minWidth: 200
  },
  title: {
    fontSize: 24
  },
  pos: {
    marginBottom: 12
  },
  subtitle: {
    fontSize: 18
  }
};

function Cart(props) {
  const { classes, cart, clearCart } = props;
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
            color="textPrimary"
            gutterBottom
          >
            My Cart
          </Typography>
        </CardHeader>
        <CardContent>
          <Typography className={classes.pos}>
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
          </Typography>
          <Grid container justify="center">
            <Typography
              className={classes.subtitle}
              color="textSecondary"
              gutterBottom
            >
              Total Price: {totalPrice.toFixed(2)}
            </Typography>
          </Grid>
        </CardContent>
        <CardActions style={{ justifyContent: 'center' }}>
          <Button onClick={clearCart}>Clear All</Button>
        </CardActions>
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
    },
    clearCart: () => {
      dispatch({ type: 'CART/CLEAR' });
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
