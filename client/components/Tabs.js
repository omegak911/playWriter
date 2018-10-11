import React from 'react';
import styled from 'styled-components';

const Tabs = ({ createOptions, displayCreate, handleSelection, selectOptions }) =>
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
            {Object.keys(option).map((item, k) =>
              <button 
                key={k} 
                name={i === 0 ? 'character' : i === 1 ? 'act' : 'scene'} 
                value={item} 
                onClick={handleSelection}>
                {item}
              </button>
            )}
          </div>
        )}
    </div>
  </div>

export default Tabs;