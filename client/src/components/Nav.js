import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Container = styled.nav`
  padding: 25px;
  background: #27292d;
  width: 100%;
`;

const StyledLink = styled(Link)`
  color: #fff;
  text-decoration: none;
`;

const Nav = () => {
  return (
    <Container>
      <StyledLink to="/">gql-bookings</StyledLink>
    </Container>
  );
};

export default Nav;
