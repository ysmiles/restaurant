import React from 'react';
import { connect } from 'react-redux';

import FoodListItem from './food-list-item';
import { view as Search } from '../../searchbar';
import { view as MapModule } from '../../map';
import Grid from '@material-ui/core/Grid';

import fetchApi from '../../../modules/fetch-api';

import './style.css';
// Note: Food listing is homepage

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    flexGrow: 1
  },
  paper: {
    height: 260,
    width: 250,
    padding: 10
  },
  control: {
    padding: theme.spacing.unit * 2
  }
});

class FoodListing extends React.Component {
  componentDidMount() {
    const { loadFoods } = this.props;
    // need real address
    // already added proxy to api server (in package.json)
    fetchApi('get', '/api/foods').then(json => {
      loadFoods(json);
    });
  }

  render() {
    const { addToCart, removeFromCart, foods, cart, classes } = this.props;
    let spacing = 15;

    return (
      <div className="Homepage">
        <Search />
        <Grid container className={classes.root} spacing={16}>
          <Grid item xs={12}>
            {/* <Paper className={classes.root} elevation={1}> */}
            {/* <div className="Food-listing"> */}
            {/* <Typography variant="h5" component="h3">
              This is a sheet of paper.
            </Typography>
            <Typography component="p">
              Paper can be used to build surface or other elements for your
              application.
            </Typography> */}
            <Grid
              container
              className={classes.demo}
              justify="center"
              spacing={Number(spacing)}
            >
              {foods.error
                ? ''
                : foods.map(food => (
                    <Grid key={food.name} item>
                      <Paper className={classes.paper}>
                        <Typography>
                          <FoodListItem
                            food={food}
                            addToCart={addToCart}
                            removeFromCart={removeFromCart}
                            cartItem={
                              cart.filter(
                                cartItem => cartItem.item_id === food.item_id
                              )[0]
                            }
                          />
                        </Typography>
                      </Paper>
                    </Grid>
                  ))}
              {/* </div> */}
            </Grid>
          </Grid>
        </Grid>
        <MapModule />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    cart: state.cart,
    foods: state.foods
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loadFoods: foods => {
      dispatch({ type: 'LOAD_FOODS', payload: foods });
    },
    addToCart: item => {
      dispatch({ type: 'ADD', payload: item });
    },
    removeFromCart: item => {
      dispatch({ type: 'REMOVE', payload: item });
    }
  };
}

FoodListing.propTypes = {
  classes: PropTypes.object.isRequired
};

FoodListing = withStyles(styles)(FoodListing);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FoodListing);
