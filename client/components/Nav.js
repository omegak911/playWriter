import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Nav = () => 
  <StyledNavBar className="flexCenter">
    <div className="flexCenter" style={{ justifyContent: 'left', marginLeft: '3%', width: '100%' }}>
      <StyledLink><Link style={{ textDecoration: 'none' }} to="/">View</Link></StyledLink>
      <StyledLink><Link style={{ textDecoration: 'none' }} to="/edit">Edit</Link></StyledLink>
      <StyledLink><Link style={{ textDecoration: 'none' }} to="draft">Draft Story</Link></StyledLink>
    </div>
  </StyledNavBar>

const StyledNavBar = styled.div`
  background-color: black;
  justify-content: left;
  height: 35px;
  width: 100%;
`

const StyledLink = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid grey;
  background-color: red;
  border-radius: 5%;
  margin: 5px;
  padding: 5px;
  text-decoration: none;
`

export default Nav;