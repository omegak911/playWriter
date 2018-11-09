import React, { Component } from 'react';
import axios from 'axios';
import styled from 'styled-components';

class Draft extends Component {
  constructor(props) {
    super(props);
    this.state = {
      draft: 'one',
    }
  }

  componentDidMount() {
    axios.get('api/draft')
      .then(({ data }) => this.setState({ draft: data }))
      .catch(err => console.error(err))
  }

  saveDraft = () => {
    let { draft } = this.state;
    axios.post('api/draft', { draft })
    .then(({ data }) => console.log(data))
    .catch(err => console.error(err))
  }

  updateDraft = (e) => {
    this.setState({ draft: e.target.value })
  }

  render() {
    let { draft } = this.state;
    return (
      <StyledCenter>
        <button type="button" onClick={this.saveDraft}>Save Draft</button>
        <p>Here we will figure out the storyline</p>
        <br/>
        <StyledTextarea name="" id="" cols="30" rows="10" value={draft} onChange={this.updateDraft}></StyledTextarea>
      </StyledCenter>
    )
  }
}

const StyledCenter = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

const StyledTextarea = styled.textarea`
  height: 80vh;
  width: 90%;
`;

export default Draft;
