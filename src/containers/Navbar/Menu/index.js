import React from 'react';
import MenuElement from "./MenuElement";
import {configuration} from "../../../config";
import './menu.scss'

const Menu = () => {
  return (
    <nav>
      {configuration.map(componentConf => <MenuElement name={componentConf.name} url={componentConf.path} logo={componentConf.logo}/>)}
    </nav>
  );
};

export default Menu;
