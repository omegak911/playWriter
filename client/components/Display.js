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
      //need act
      selectOptions.acts[act] = true;
      sceneKeys = Object.keys(scripts[act]);
      return (
        <div key={i}>
          <h3>Act {act}</h3>
          {sceneKeys.map((scene, j) => {
            selectOptions.scenes[scene] = true;
            scriptKeys = scripts[act][scene];
            return <div key={j}>
              <h4>Scene {scene}</h4>
              {scriptKeys.map((script, k) => {
                //need character
                //condition at end of iteration
                atLastItem(i,j,k);
                return (
                  <StyledSpeech key={k}>
                    {script}
                  </StyledSpeech>
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