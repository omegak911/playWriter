import React, { Component } from 'react';
import axios from 'axios'
import styled from 'styled-components';

import Tabs from './Tabs';
import Display from './Display';

class Edit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      createOptions: ['characters', 'acts', 'scenes'],
      selectOptions: {
        characters: {
  
        },
        acts: {
  
        },
        scenes: { //act#scene#: #
  
        },
      },
      currentScript: [],
      options: [],
      showCreateBox: false,
      createType: '',
      text: '',
      requiredSelections: {
        character: false,
        act: false,
        scene: false,
      },
      update: true,
    }
  }

  componentWillMount() {
    this.setState({ currentScript: this.props.scripts }, () => console.log(this.state.currentScript));
  }

  updateSelectOptions = (selectOptions) => {
    this.setState({ selectOptions, update: false });
  }

  handleChange = (e) => {
    this.setState({ text: e.target.value });
  }

  displayCreate = (e) => {
    this.setState({ showCreateBox: true, createType: e.target.value});
  }

  handleSelection = (e) => {
    let { name, value } = e.target;
    let requiredSelections = {...this.state.requiredSelections};
    requiredSelections[name] = value;
    this.setState({ requiredSelections }, () => console.log(this.state.requiredSelections));
  }

  handleCreate = (e) => {
    e.preventDefault()
    let { createType, text, selectOptions } = this.state;

    if (selectOptions[createType][text]) {
      alert('this already exists');
    } else {
      let copy = {...selectOptions};
      copy[createType][text] = true;
      this.setState({ selectOption: copy, showCreateBox: false, createType: '', text: '' });
    }
  }

  handleText = (e) => {
    this.setState({ text: e.target.value });
  }

  createSpeech = (e) => {
    e.preventDefault();
    let { requiredSelections, currentScript, text } = this.state;
    let { character, act, scene } = requiredSelections;

    const logger = () => console.log(this.state.currentScript);  //delete this

    let scriptCopy = {...currentScript};

    if (act && scene && text) {
      scriptCopy[act] = scriptCopy[act] || {};
      scriptCopy[act][scene] = scriptCopy[act][scene] || [];
      scriptCopy[act][scene].push({ scene, text, character });
      this.setState({ currentScript: scriptCopy, text: '' }, logger);
    } else {
      alert('missing information')
    }
  }

  savePlay = () => {
    axios.post('/api/edit', this.state.currentScript)
      .then(() => console.log('hey'))
      .catch((err) => console.error(`error: ${err}`));
  }

  render() {
    let { createOptions, createType, showCreateBox, selectOptions, update, text } = this.state;
    let { characters, acts, scenes } = selectOptions;
    let { scripts } = this.props;
    return (
      <div>
        Welcome to Edit
        {showCreateBox ?
          <div> 
            Creating new {createType}
            <form action="" onSubmit={this.handleCreate}>
              <input type="text" onChange={this.handleChange}/>
              <button type="button" onClick={this.handleCreate}>submit</button>
            </form>
          </div>
          :
          <div>
            <button onClick={this.savePlay}>SAVE</button>
          </div>
        }
        <Tabs 
          createOptions={createOptions} 
          displayCreate={this.displayCreate} 
          handleSelection={this.handleSelection}
          selectOptions={[characters, acts, scenes]}
          />
        <div>
          Write your art here:
          <form action="" onSubmit={this.createSpeech}>
            <input type="text" value={text} name="art" onChange={this.handleText}/>
            <button type="submit">submit</button>
          </form>
        </div>
        <Display scripts={scripts} updateSelectOptions={this.updateSelectOptions} update={update}/>
      </div>
    )
  }
}


export default Edit;
