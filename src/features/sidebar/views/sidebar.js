import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
// import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';

const styles = {
  bigAvatar: {
    margin: 10,
    width: 80,
    height: 80
  }
};

function ImageAvatars(props) {
  const { classes } = props;
  return (
    <Grid container justify="center" alignItems="center">
      <Avatar
        alt="Remy Sharp"
        src="/image/avatar1.png"
        className={classes.bigAvatar}
      />
    </Grid>
  );
}

ImageAvatars.propTypes = {
  classes: PropTypes.object.isRequired
};

ImageAvatars = withStyles(styles)(ImageAvatars);

class Sidebar extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.toggleDrawer = this.toggleDrawer.bind(this);
  }

  toggleDrawer(side, open) {
    const { toggleSidebar } = this.props;
    let expectedNewState = {};
    expectedNewState[side] = open;
    toggleSidebar(expectedNewState);
  }

  render() {
    const { left, logOut, user, history, loginInfo } = this.props;

    const sideList = (
      // <div className={classes.list}>
      <div className="SideList">
        <ImageAvatars />
        <List>
          {/* {["My orders", "Account Details"].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))} */}
          <ListItem
            button
            key="My Orders"
            onClick={() => {
              history.push(
                '/' + (loginInfo.loginStatus ? user.first_name : 'login')
              );
            }}
          >
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="My Orders" />
          </ListItem>

          <ListItem
            button
            key="Account Details"
            onClick={() => {
              history.push(
                '/' +
                  (loginInfo.loginStatus
                    ? user.first_name + '/details'
                    : 'login')
              );
            }}
          >
            <ListItemIcon>
              <MailIcon />
            </ListItemIcon>
            <ListItemText primary="Account Details" />
          </ListItem>
        </List>
        <Divider />
        <List>
          {/* {["Log out"].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))} */}
          <ListItem
            button
            key="Log out"
            onClick={() => {
              logOut();
              history.push('/');
            }}
          >
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="Log out" />
          </ListItem>
        </List>
      </div>
    );

    return (
      <div className="Sidebar">
        {/* <IconButton
          color="inherit"
          aria-label="Open drawer"
          onClick={() => this.toggleDrawer("left", true)}>
          <MenuIcon />
        </IconButton> */}
        {/* <Button onClick={() => this.toggleDrawer("left", true)}>
          Open Left
        </Button> */}
        {/* <Drawer anchor="top" open={this.state.top} onClose={this.toggleDrawer('top', false)}> */}
        <Drawer open={left} onClose={() => this.toggleDrawer('left', false)}>
          <div
            tabIndex={0}
            role="button"
            onClick={() => this.toggleDrawer('left', false)}
            onKeyDown={() => this.toggleDrawer('left', false)}
          >
            {sideList}
          </div>
        </Drawer>
      </div>
    );
  }
}

function mapStateToProps(state) {
  //   state = {
  //     top: false,
  //     left: false,
  //     bottom: false,
  //     right: false,
  //   };
  let props = Object.assign({}, state.sidebar);
  props = {
    loginInfo: state.login,
    user: state.user,
    ...props
  };
  return props;
}

function mapDispatchToProps(dispatch) {
  return {
    toggleSidebar: item => {
      dispatch({ type: 'SIDEBAR/TOGGLE', payload: item });
    },
    logOut: () => {
      dispatch({ type: 'LOGIN_STATUS', payload: { status: false } });
      dispatch({ type: 'USER/RESET' });
    }
  };
}

// Sidebar.propTypes = {
//   classes: PropTypes.object.isRequired
//   // title: propTypes.string.isRequired
// };

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
    null,
    { withRef: true }
    // )(Sidebar);
  )(withStyles(styles)(Sidebar))
);

// export default withStyles(styles)(TemporaryDrawer);
