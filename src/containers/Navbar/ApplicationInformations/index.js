import React from 'react';
import logo from './mockup.svg';
import './ApplicationInformations.scss'

const ApplicationName = () => {
  return (
    <div className='application-informations'>
      <img src={logo} alt='INSERT NAME'/>
      <h1>INSERT NAME</h1>
    </div>
  );
};

export default ApplicationName;
