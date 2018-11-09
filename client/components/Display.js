import React from 'react';
import styled from 'styled-components';

const Display = ({ scripts, updateSelectOptions, update }) => {
  let actKeys = Object.keys(scripts);
  let sceneKeys;
  let scriptKeys;

  let selectOptions = {
    acts: {},
    characters: {},
    scenes: {},
  };

  const atLastItem = (i,j,k) => {
    if (update && i === actKeys.length - 1 && j === sceneKeys.length - 1 && k === scriptKeys.length - 1) {
      updateSelectOptions(selectOptions);
    }
  }


  return (<div>
    {actKeys.map((act, i) => {
      selectOptions.acts[act] = true;
      sceneKeys = Object.keys(scripts[act]);
      return (
        <div key={i}>
          <h2>ACT {act}</h2>
          {sceneKeys.map((scene, j) => {
            selectOptions.scenes[scene] = true;
            scriptKeys = scripts[act][scene];
            return <div key={j}>
              <h3>SCENE {scene}</h3>
              {scriptKeys.map((script, k) => {
                if (script.character) {
                  selectOptions.characters[script.character] = true;
                }
                atLastItem(i,j,k);
                return (
                  <div key={k}>
                    {script.character ? <b>{script.character}</b> : ''}
                    <StyledSpeech>{script.text}</StyledSpeech>
                  </div>
                )
              })}
            </div>
          })}
        </div>
      )
    })}
  </div>)
}

const StyledSpeech = styled.div`
  margin: 15px;
`

  export default Display;