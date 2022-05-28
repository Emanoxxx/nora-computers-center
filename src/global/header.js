import React from 'react';
import NavBar from './navbar';
class Header extends React.Component {
  constructor(props) {
      super(props);
      this.name=props.name;
  }
  render() {
    return (
    <header>
        <NavBar></NavBar>
    </header>
    
    );
  }

}

export default Header;