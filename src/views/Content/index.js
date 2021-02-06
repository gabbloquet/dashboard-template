import React from "react";
import Topbar from "../../containers/Topbar";
import './content.scss'

const Content = () => {
  return (
    <section className='content'>
      <Topbar componentName='Content'/>
      <h1>Welcome in content Component !</h1>
    </section>
  );
};

export default Content;
