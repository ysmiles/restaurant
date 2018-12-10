import React from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles = {
  card: {
    margin: 30,
    minWidth: 275,
    maxWidth: 600,
    justifyContent: 'center'
  },
  title: {
    fontSize: 24
  },
  pos: {
    marginBottom: 12
  }
};

class Userdetails extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    const { user, classes } = this.props;
    console.log(user);

    return (
      <div className="Userdetails">
        <Card className={classes.card}>
          <CardContent>
            <Typography
              className={classes.title}
              color="textPrimary"
              gutterBottom
            >
              {user.first_name} {user.last_name}
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
              Customer ID: {user.customer_id}
            </Typography>
            <Typography component="p">
              Phone: {user.phone_number}
              <br />
              Email: {user.email}
              <br />
              Address: {user.address}
            </Typography>
          </CardContent>
          <CardActions>
            <Button>Change</Button>
          </CardActions>
        </Card>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    login: state.login,
    user: state.user
  };
}

function mapDispatchToProps(dispatch) {
  return {
    updateUserdetails: item => {
      dispatch({ type: 'USER/UPDATE', payload: item });
    }
  };
}

Userdetails.propTypes = {
  classes: PropTypes.object.isRequired
};

Userdetails = withStyles(styles)(Userdetails);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Userdetails);
