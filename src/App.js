import React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Navbar from "./containers/Navbar";
import {configuration} from "./config";

const App = () => {
  return (
    <Router>
      <Navbar />
      <section className='main-content'>
        <Switch>
          {configuration.map(componentConf => <Route path={componentConf.path} component={componentConf.component} exact/>)}
        </Switch>
      </section>
    </Router>
  );
}

export default App;
