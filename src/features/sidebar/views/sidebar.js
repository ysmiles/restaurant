import React from 'react';
import { connect } from 'react-redux';

// import PropTypes from "prop-types";
// import { withStyles } from "@material-ui/core/styles";
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

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
    const { left } = this.props;

    const sideList = (
      // <div className={classes.list}>
      <div className="SideList">
        <List>
          {['My orders', 'Account Details veryyyyyy long'].map(
            (text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            )
          )}
        </List>
        <Divider />
        <List>
          {['Log out'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </div>
    );

    return (
      <div className="Sidebar">
        <IconButton
          color="inherit"
          aria-label="Open drawer"
          onClick={() => this.toggleDrawer('left', true)}
        >
          <MenuIcon />
        </IconButton>
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
  return props;
}

function mapDispatchToProps(dispatch) {
  return {
    toggleSidebar: item => {
      dispatch({ type: 'SIDEBAR/TOGGLE', payload: item });
    }
  };
}

// Sidebar.propTypes = {
//   classes: PropTypes.object.isRequired
//   // title: propTypes.string.isRequired
// };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Sidebar);
// )(withStyles(styles)(Sidebar));

// export default withStyles(styles)(TemporaryDrawer);
