import React from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { view as User } from '../user';
import { view as Sidebar } from '../sidebar';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

const styles = {
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
};

class Navigation extends React.Component {
  constructor(props) {
    super(props);
  }

  onClick = () => {
    this.props.toggleSidebar({
      ['left']: true
    });
  };

  render() {
    const { cart, login, classes, history, user } = this.props;
    const { loginStatus } = login;

    return (
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Toolbar>
            <IconButton
              className={classes.menuButton}
              color="inherit"
              aria-label="Menu"
              onClick={this.onClick}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" className={classes.grow}>
              Welcome
            </Typography>

            <Button color="inherit" onClick={() => history.push('/')}>
              Home
            </Button>

            <Button
              color="inherit"
              onClick={() =>
                history.push('/' + (loginStatus ? user.first_name : 'login'))
              }
            >
              {loginStatus ? user.first_name : 'Login'}
            </Button>

            {/* <Button color="inherit" onClick={() => history.push('/orders')}>
              Orders
            </Button> */}

            <Button color="inherit" onClick={() => history.push('/checkout')}>
              <ShoppingCartIcon />(
              {cart.reduce((acc, item) => {
                return acc + item.quantity;
              }, 0)}
              )
            </Button>

            {/* <Button color="inherit" onClick={() => history.push('/checkout')}>
              Checkout
            </Button> */}
          </Toolbar>
        </AppBar>

        <Sidebar />

        {loginStatus ? (
          <div>
            <Route exact path={'/' + user.first_name} component={User.orders} />
            <Route
              exact
              path={'/' + user.first_name + '/details'}
              component={User.details}
            />
            {/* <Redirect from="/login" to={('/' + user.first_name)} /> */}
          </div>
        ) : (
          ''
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    cart: state.cart,
    login: state.login,
    user: state.user
  };
}

function mapDispatchToProps(dispatch) {
  return {
    toggleSidebar: item => {
      dispatch({ type: 'SIDEBAR/TOGGLE', payload: item });
    }
  };
}

Navigation.propTypes = {
  classes: PropTypes.object.isRequired
};

Navigation = withStyles(styles)(Navigation);

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Navigation)
);
