import React from "react";
import Topbar from "../../containers/Topbar";
import './about.scss'

const About = () => {
  return (
    <section className='about'>
      <Topbar componentName='About'/>
      <h1>Welcome in About Component !</h1>
    </section>
  );
};

export default About;
