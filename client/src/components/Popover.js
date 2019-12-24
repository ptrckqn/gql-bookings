import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
`;

const List = styled.ul`
  position: absolute;
  left: ${props => props.x}px;
  top: ${props => props.y}px;
  background-color: #383b40;
  border-radius: 10px;
  padding: 10px 0;
  list-style-type: none;
  z-index: 2;
  min-width: 150px;
`;

const Popover = ({ coordinates, setCoordinates, children }) => {
  useEffect(() => {}, []);

  const handleClick = e => {
    if (e.target.id === "background") {
      return setCoordinates([]);
    }
  };
  return (
    <Container id="background" onClick={handleClick}>
      <List x={coordinates[0]} y={coordinates[1]}>
        {children}
      </List>
    </Container>
  );
};

export default Popover;
