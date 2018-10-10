import React, { Component } from 'react';

class View extends Component {
  constructor(props) {
    super(props);
    this.state = {
      play: [1,2],
    }
  }

  render() {
    let { play } = this.state;
    return (
      <div>
        Welcome to View
        {play.map((part, index) => 
          <div key={index}>
            { part }
          </div>
        )}
      </div>
    )
  }
}

export default View;
