import React from 'react';

import Display from './Display';

const View = ({ scripts }) => 
  <div>
    <Display scripts={scripts} updateSelectOptions={() => console.log('n/a')} update={false}/>
  </div>

export default View;
