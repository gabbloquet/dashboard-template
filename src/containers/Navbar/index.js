import React from 'react';
import ApplicationInformations from "./ApplicationInformations";
import Menu from "./Menu";
import './navbar.scss'

const Navbar = () => {
  return (
    <section className='navbar'>
      <ApplicationInformations />
      <Menu />
    </section>
  );
};

export default Navbar;
