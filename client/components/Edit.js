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
      script: [],
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

  handleCreate = () => {
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
    let { requiredSelections, script, text } = this.state;
    let { character, act, scene } = requiredSelections;

    const logger = () => console.log(this.state.script);  //delete this

    if (character) {
      if (act && scene && text) {
        this.setState({ script: [...script, { act, scene, character, text }] }, logger);
      } else {
        alert('hey you need act, scene, and text')
      }
    } else if (scene) {
      if (act && text) {
        this.setState({ script: [...script, { act, scene, text }]}, logger);
      } else {
        alert('hey you need act and text')
      }
    } else {
      alert('pick something')
    }
  }

  savePlay = () => {
    console.log('this should take in this.state.script and writefile');
    //doesn't really matter if we rewrite the whole file each time
    //it's more expensive figuring out specifically which part of the document to update
    axios.post('/api', this.state.script)
      .then(() => console.log('hey'))
      .catch((err) => console.error(`error: ${err}`));
  }

  render() {
    let { createOptions, createType, showCreateBox, selectOptions, update } = this.state;
    let { characters, acts, scenes } = selectOptions;
    let { scripts } = this.props;
    return (
      <div>
        Welcome to Edit
        {showCreateBox ?
          <div> 
            Creating new {createType}
            <input type="text" onChange={this.handleChange}/>
            <button type="button" onClick={this.handleCreate}>submit</button>
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
            <textarea type="text" name="art" onChange={this.handleText}/>
            <button type="submit">submit</button>
          </form>
        </div>
        <Display scripts={scripts} updateSelectOptions={this.updateSelectOptions} update={update}/>
      </div>
    )
  }
}


export default Edit;
