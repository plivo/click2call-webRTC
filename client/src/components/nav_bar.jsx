import AppBar from 'material-ui/AppBar';
import React from 'react';
import muiThemeable from 'material-ui/styles/muiThemeable';

const styles = {
  navbar: {
    backgroundColor: '#ffffff',
  }
}

const logoPath = 'https://s3.amazonaws.com/plivo_blog_uploads/logo/Plivo-logo.svg?v=202111050924';

const NavBar = (props) => (
  <AppBar
    title={<img src={logoPath} className="logo"/>}
    showMenuIconButton={false}
    style={styles.navbar}
  />
);

export default muiThemeable() (NavBar);
