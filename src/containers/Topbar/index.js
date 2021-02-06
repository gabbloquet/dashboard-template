import React from 'react';
import './topbar.scss'

const Topbar = ({componentName}) => {
  return (
    <div className='topbar'>
      <h2>{componentName}</h2>
    </div>
  );
};

export default Topbar;
