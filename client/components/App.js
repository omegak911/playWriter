import React, { Component } from 'react';
import { Switch, Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import './App.css';

import Draft from './Draft';
import Edit from './Edit';
import View from './View';
import Nav from './Nav';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scripts: null
    }
  }

  componentDidMount() {
    axios.get('/api/script')
      .then(({ data: scripts }) => {
        this.setState({ scripts });
      })
      .catch((err) => console.error(err));
  }

  render() {
    let { scripts } = this.state;
    return (
      <div>
        {scripts &&
          <BrowserRouter>
            <div className="App">
              <Nav />
              <Switch>
                <Route exact path="/"
                  render={() => <View scripts={this.state.scripts}/>}
                  // component={View}
                  />
                <Route path="/edit" 
                  render={() => <Edit scripts={this.state.scripts}/>}
                  // component={Edit}
                  />
                <Route path="/draft" 
                  render={() => <Draft />}
                  // component={Draft}
                  />
              </Switch>
            </div>
          </BrowserRouter>
        }
      </div>
    );
  }
}

export default App;
