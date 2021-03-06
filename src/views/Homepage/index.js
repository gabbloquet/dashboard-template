import React from 'react';
import Topbar from "../../containers/Topbar";
import './homepage.scss'

const Homepage = () => {
  return (
    <section className='homepage'>
      <Topbar componentName='Homepage'/>
      <h1>Welcome ! This is the Homepage !</h1>
      <p>Start to create content easily :)</p>
    </section>
  );
};

export default Homepage;
