import React, { Component } from 'react';
import { Switch, Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import './App.css';

import Draft from './Draft';
import Edit from './Edit';
import View from './View';
import Nav from './Nav';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Nav />
          <Switch>
            <Route exact path="/" component={View}/>
            <Route path="/edit" component={Edit}/>
            <Route path="/draft" component={Draft}/>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
