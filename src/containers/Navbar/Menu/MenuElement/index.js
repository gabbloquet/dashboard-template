import React from 'react';
import {Link} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './menuElement.scss'

const MenuElement = ({logo, name, url }) => {
  return (
    <div className='menu-element'>
      <div className="logo-wrapper">
        <FontAwesomeIcon icon={logo} size='lg'/>
      </div>
      <Link to={url}>{name}</Link>
    </div>
  );
};

export default MenuElement;