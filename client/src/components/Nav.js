import React, { useContext } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { UserContext } from "../context/userContext";

const Container = styled.nav`
  padding: 25px;
  background: #27292d;
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const StyledLink = styled(Link)`
  color: #fff;
  text-decoration: none;
`;

const Logout = styled.button`
  border: 1px solid #fff;
  padding: 5px 10px;
  border-radius: 10px;
  background: transparent;
  color: #fff;
  cursor: pointer;
  &:focus,
  &:hover {
    background: #2d2f34;
  }
`;

const Nav = () => {
  const [user, setUser] = useContext(UserContext);

  const handleClick = () => {
    setUser();
  };
  return (
    <Container>
      <StyledLink to="/">gql-bookings</StyledLink>
      {user && <Logout onClick={handleClick}>Sign Out</Logout>}
    </Container>
  );
};

export default Nav;
