import React, { Component } from 'react';
import styled from 'styled-components';

class Tabs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      character: '',
      act: '',
      scene: '',
    }
  }

  highlightSelect = (e) => {
    let { handleSelection } = this.props;
    let { name, value } = e.target;
    this.setState({ [name]: value });
    handleSelection(e);
  }

  render() {
    let { createOptions, displayCreate, selectOptions } = this.props;
    return (
      <div>
        <div className="flexCenter" style={{ justifyContent: 'left' }}>
          Create new:
          {createOptions.map((type, i) =>
            <button key={i} type="button" onClick={displayCreate} value={type}>
              {type}
            </button>
          )}
        </div>
        <div className="flexCenter" style={{ flexDirection: 'column', justifyContent: 'left' }}>
          Select:
            {selectOptions.map((option, i) =>
              <div key={i}>
                - <label>{i === 0 ? 'Characters' : i === 1 ? 'Acts' : 'Scenes'}:</label>
                {Object.keys(option).map((item, k) => {
                  let name = i === 0 ? 'character' : i === 1 ? 'act' : 'scene';
                  let color = this.state[name] === item ? 'green' : 'white';
                  return <button 
                    key={k}
                    name={name}
                    value={item} 
                    style={{ backgroundColor: color }}
                    onClick={this.highlightSelect}>
                    {item}
                  </button>
                })}
              </div>
            )}
        </div>
      </div>
    )
  }
}

export default Tabs;