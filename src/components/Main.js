import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './Home';
import Rockets from './Rockets';
import Launches from './Launches';

const Main = () => (
  <main className="container">
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route path='/rockets' component={Rockets}/>
      <Route path='/launches' component={Launches}/>
    </Switch>
  </main>
)

export default Main;
